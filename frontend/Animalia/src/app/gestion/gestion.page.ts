import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
  standalone: false
})
export class GestionPage implements OnInit {
  currentView: string = '';
  usuarios: any[] = [];
  animales: any[] = [];
  empresas: any[] = [];
  rescates: any[] = [];
  loggedInUserId: number = Number(sessionStorage.getItem('id'));
  showForm: boolean = false;
  showUpdateForm: boolean = false;
  showAnimalForm: boolean = false;
  showUpdateAnimalForm: boolean = false;
  showEmpresaForm: boolean = false;
  showUpdateEmpresaForm: boolean = false;
  showRescateForm: boolean = false;
  showUpdateRescateForm: boolean = false;
  newUsuario: any = {};
  selectedUsuario: any = {};
  newAnimal: any = {};
  selectedAnimal: any = {};
  newEmpresa: any = {};
  selectedEmpresa: any = {};
  newRescate: any = {};
  selectedRescate: any = {};
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.loggedInUserId = Number(sessionStorage.getItem('id'));
    this.getUsuarios();
    this.getAnimales();
    this.getEmpresas();
    this.getRescates();
  }

  showList(view: string) {
    this.currentView = view;
  }

  goBack() {
    this.currentView = '';
  }

  showAddUserForm() {
    this.showForm = true;
    this.showUpdateForm = false;
    this.newUsuario = {};
  }

  showUpdateUserForm(usuario: any) {
    this.showUpdateForm = true;
    this.showForm = false;
    this.selectedUsuario = { ...usuario };
  }

  cancelAddUser() {
    this.showForm = false;
  }

  cancelUpdateUser() {
    this.showUpdateForm = false;
  }

  getUsuarios() {
    this.http.get<any[]>(`${environment.apiUrl}/usuarios/todos-incluidos-eliminados`).subscribe(data => {
      this.usuarios = data.filter(usuario => usuario.id !== this.loggedInUserId);
    }, error => {
      console.error('Error al obtener usuarios:', error);
    });
  }

  addUsuario() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://backend:9000/auth/add', this.newUsuario, { headers }).subscribe(() => {
      this.getUsuarios();
      this.showForm = false;
      this.errorMessage = '';
    }, error => {
      console.error('Error al añadir usuario:', error);
      if (error.status === 400 && error.error.message.includes('telefono ya existe')) {
        this.errorMessage = 'El teléfono ya existe. Por favor, use un número diferente.';
      } else {
        this.errorMessage = 'Error al añadir usuario. Por favor, inténtelo de nuevo.';
      }
    });
  }

  updateUsuario() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const usuarioActualizado = {
      id: this.selectedUsuario.id,
      nombre: this.selectedUsuario.nombre,
      apellido: this.selectedUsuario.apellido,
      email: this.selectedUsuario.email,
      password: this.selectedUsuario.password,
      telefono: this.selectedUsuario.telefono,
      direccion: this.selectedUsuario.direccion,
      url_foto_perfil: this.selectedUsuario.url_foto_perfil,
      tipoUsuario: this.selectedUsuario.tipoUsuario,
      fecha_registro: this.selectedUsuario.fecha_registro,
      cantidad_rescates: this.selectedUsuario.cantidad_rescates
    };

    this.http.put(`${environment.apiUrl}/usuarios`, usuarioActualizado, { headers }).subscribe(() => {
      this.getUsuarios();
      this.showUpdateForm = false;
      this.errorMessage = '';
    }, error => {
      console.error('Error al actualizar usuario:', error);
      if (error.status === 400 && error.error.message.includes('telefono ya existe')) {
        this.errorMessage = 'El teléfono ya existe. Por favor, use un número diferente.';
      } else {
        this.errorMessage = 'Error al actualizar usuario. Por favor, inténtelo de nuevo.';
      }
    });
  }

  deleteUsuario(id: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`${environment.apiUrl}/usuarios/${id}`, { headers }).subscribe(() => {
      this.getUsuarios();
    }, error => {
      console.error('Error al eliminar usuario:', error);
    });
  }

  toggleUsuarioStatus(usuario: any) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const updatedUsuario = { ...usuario, deleted: !usuario.deleted };

    this.http.put(`${environment.apiUrl}/usuarios`, updatedUsuario, { headers }).subscribe(() => {
      this.getUsuarios();
    }, error => {
      console.error('Error al cambiar el estado del usuario:', error);
    });
  }

  resetPassword(id: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post(`${environment.apiUrl}/usuarios/${id}/restablecer-contrasena`, {}, { headers }).subscribe(() => {
      this.getUsuarios();
    }, error => {
      console.error('Error al restablecer la contraseña:', error);
    });
  }

  getRescates() {
    this.http.get<any[]>(`${environment.apiUrl}/rescates/detalle`).subscribe(data => {
      this.rescates = data.map(rescate => ({
        id: rescate.id,
        nombreEmpresa: rescate.nombreEmpresa,
        nombreUsuario: rescate.nombreUsuario,
        nombreAnimal: rescate.nombreAnimal,
        ubicacion: rescate.ubicacion,
        estadoRescate: rescate.estadoRescate,
        estadoAnimal: rescate.estadoAnimal,
        fechaRescate: rescate.fechaRescate
      }));
    }, error => {
      console.error('Error al obtener rescates:', error);
    });
  }

  displayUpdateRescateForm(rescate: any) {
    this.showUpdateRescateForm = true;
    this.selectedRescate = {
      ...rescate,
      empresaId: this.empresas.find(empresa => empresa.nombre === rescate.nombreEmpresa)?.id,
      usuarioId: this.usuarios.find(usuario => usuario.nombre === rescate.nombreUsuario)?.id,
      animalId: this.animales.find(animal => animal.nombre_comun === rescate.nombreAnimal)?.id
    };
  }

  cancelUpdateRescate() {
    this.showUpdateRescateForm = false;
  }

  updateRescate() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = {
      empresaId: this.selectedRescate.empresaId,
      usuarioId: this.selectedRescate.usuarioId,
      animalId: this.selectedRescate.animalId
    };

    const rescateActualizado = {
      id: this.selectedRescate.id,
      nombreEmpresa: this.selectedRescate.nombreEmpresa,
      nombreUsuario: this.selectedRescate.nombreUsuario,
      nombreAnimal: this.selectedRescate.nombreAnimal,
      ubicacion: this.selectedRescate.ubicacion,
      estadoRescate: this.selectedRescate.estadoRescate,
      estadoAnimal: this.selectedRescate.estadoAnimal,
      fechaRescate: this.selectedRescate.fechaRescate
    };

    this.http.put(`${environment.apiUrl}/rescates/${rescateActualizado.id}`, rescateActualizado, { headers, params }).subscribe(() => {
      this.getRescates();
      this.showUpdateRescateForm = false;
      this.errorMessage = '';
    }, error => {
      console.error('Error al actualizar rescate:', error);
      this.errorMessage = 'Error al actualizar rescate. Por favor, inténtelo de nuevo.';
    });
  }

  getEmpresas() {
    this.http.get<any[]>(`${environment.apiUrl}/empresas/todos-incluidas-eliminadas`).subscribe(data => {
      this.empresas = data;
    }, error => {
      console.error('Error al obtener empresas:', error);
    });
  }

  showAddEmpresaForm() {
    this.showEmpresaForm = true;
    this.showUpdateEmpresaForm = false;
    this.newEmpresa = {};
  }

  displayUpdateEmpresaForm(empresa: any) {
    this.showUpdateEmpresaForm = true;
    this.showEmpresaForm = false;
    this.selectedEmpresa = { ...empresa };
  }

  cancelAddEmpresa() {
    this.showEmpresaForm = false;
  }

  cancelUpdateEmpresa() {
    this.showUpdateEmpresaForm = false;
  }

  addEmpresa() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const nuevaEmpresa = {
      nombre: this.newEmpresa.nombre,
      direccion: this.newEmpresa.direccion,
      telefono: this.newEmpresa.telefono,
      email: this.newEmpresa.email,
      tipo: this.newEmpresa.tipo,
      url_web: this.newEmpresa.url_web,
      fecha_creacion: new Date().toISOString().split('T')[0],
      usuarios: []
    };

    this.http.post(`${environment.apiUrl}/empresas`, nuevaEmpresa, { headers }).subscribe(() => {
      this.getEmpresas();
      this.showEmpresaForm = false;
      this.errorMessage = '';
    }, error => {
      console.error('Error al añadir empresa:', error);
      this.errorMessage = 'Error al añadir empresa. Por favor, inténtelo de nuevo.';
    });
  }

  updateEmpresa() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const empresaActualizada = {
      id: this.selectedEmpresa.id,
      nombre: this.selectedEmpresa.nombre,
      direccion: this.selectedEmpresa.direccion,
      telefono: this.selectedEmpresa.telefono,
      email: this.selectedEmpresa.email,
      tipo: this.selectedEmpresa.tipo,
      url_web: this.selectedEmpresa.url_web,
      fecha_creacion: this.selectedEmpresa.fecha_creacion,
      usuarios: this.selectedEmpresa.usuarios
    };

    this.http.put(`${environment.apiUrl}/empresas`, empresaActualizada, { headers }).subscribe(() => {
      this.getEmpresas();
      this.showUpdateEmpresaForm = false;
      this.errorMessage = '';
    }, error => {
      console.error('Error al actualizar empresa:', error);
      this.errorMessage = 'Error al actualizar empresa. Por favor, inténtelo de nuevo.';
    });
  }

  deleteEmpresa(id: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`${environment.apiUrl}/empresas/${id}`, { headers }).subscribe(() => {
      this.getEmpresas();
    }, error => {
      console.error('Error al eliminar empresa:', error);
    });
  }

  toggleEmpresaStatus(empresa: any) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const updatedEmpresa = { ...empresa, deleted: !empresa.deleted };

    this.http.put(`${environment.apiUrl}/empresas`, updatedEmpresa, { headers }).subscribe(() => {
      this.getEmpresas();
    }, error => {
      console.error('Error al cambiar el estado de la empresa:', error);
    });
  }

  getAnimales() {
    this.http.get<any[]>(`${environment.apiUrl}/animales/todos-incluidos-eliminados`).subscribe(data => {
      this.animales = data;
    }, error => {
      console.error('Error al obtener animales:', error);
    });
  }

  showAddAnimalForm() {
    this.showAnimalForm = true;
    this.showUpdateAnimalForm = false;
    this.newAnimal = {};
  }

  displayUpdateAnimalForm(animal: any) {
    this.showUpdateAnimalForm = true;
    this.showAnimalForm = false;
    this.selectedAnimal = { ...animal };
  }

  cancelAddAnimal() {
    this.showAnimalForm = false;
  }

  cancelUpdateAnimal() {
    this.showUpdateAnimalForm = false;
  }

  addAnimal() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const nuevoAnimal = {
      nombre_comun: this.newAnimal.nombre_comun,
      especie: this.newAnimal.especie,
      descripcion: this.newAnimal.descripcion,
      familia: this.newAnimal.familia.toUpperCase(),
      estado_conservacion: this.newAnimal.estado_conservacion
    };

    this.http.post(`${environment.apiUrl}/animales`, nuevoAnimal, { headers }).subscribe(() => {
      this.getAnimales();
      this.showAnimalForm = false;
      this.errorMessage = '';
    }, error => {
      console.error('Error al añadir animal:', error);
      this.errorMessage = 'Error al añadir animal. Por favor, inténtelo de nuevo.';
    });
  }

  updateAnimal() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const animalActualizado = {
      id: this.selectedAnimal.id,
      nombre_comun: this.selectedAnimal.nombre_comun,
      especie: this.selectedAnimal.especie,
      descripcion: this.selectedAnimal.descripcion,
      familia: this.selectedAnimal.familia,
      estado_conservacion: this.selectedAnimal.estado_conservacion,
      foto: this.selectedAnimal.foto
    };

    this.http.put(`${environment.apiUrl}/animales`, animalActualizado, { headers }).subscribe(() => {
      this.getAnimales();
      this.showUpdateAnimalForm = false;
      this.errorMessage = '';
      location.reload();
    }, error => {
      console.error('Error al actualizar animal:', error);
      this.errorMessage = 'Error al actualizar animal. Por favor, inténtelo de nuevo.';
    });
  }

  deleteAnimal(id: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`${environment.apiUrl}/animales/${id}`, { headers }).subscribe(() => {
      this.getAnimales();
    }, error => {
      console.error('Error al eliminar animal:', error);
    });
  }

  toggleAnimalStatus(animal: any) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const updatedAnimal = { ...animal, deleted: !animal.deleted };

    this.http.put(`${environment.apiUrl}/animales`, updatedAnimal, { headers }).subscribe(() => {
      this.getAnimales();
    }, error => {
      console.error('Error al cambiar el estado del animal:', error);
    });
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('imagen', file);

    this.http.post<{ url: string }>(`${environment.apiUrl}/subir-imagen`, formData).subscribe(response => {
      this.newAnimal.foto = response.url;
    }, error => {
      console.error('Error al subir imagen:', error);
    });
  }
}