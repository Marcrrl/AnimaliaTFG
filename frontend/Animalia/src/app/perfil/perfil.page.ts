import { Component, OnInit, Inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MenuController, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonTab } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  usuario: any;
  camposActivos: boolean = false;
  imagenPerfil: any;
  usuarioOriginal: any;
  mostrarCampoContrasena: boolean = false;
  imagenesUsuario: any[] = [];

  constructor(@Inject(UsuarioService) private usuarioService: UsuarioService, private http: HttpClient) {}

  cerrarSesion() {
    sessionStorage.clear();
    window.location.href = '/Inicio';
  }

  ngOnInit() {
    const userId = sessionStorage.getItem("id");
    if (userId) {
      this.usuarioService.getUsuarioById(userId).subscribe((data: any) => {
        this.usuario = data;
        this.usuarioOriginal = { ...this.usuario };
        this.cargarImagenPerfil(this.usuario.url_foto_perfil);
        this.actualizarBadgeRescates(this.usuario.cantidad_rescates);
      });
      this.cargarImagenesUsuario(userId);
    } else {
      console.error('No se encontró el id del usuario');
    }
  }

  activarCampos() {
    this.camposActivos = !this.camposActivos;
    if (!this.camposActivos) {
      this.usuario = { ...this.usuarioOriginal };
    }
  }

  cancelarCambios() {
    this.camposActivos = false;
    this.usuario = { ...this.usuarioOriginal };
    (document.querySelector('ion-input[label="Nombre"]') as HTMLInputElement).value = this.usuarioOriginal.nombre;
    (document.querySelector('ion-input[label="Apellidos"]') as HTMLInputElement).value = this.usuarioOriginal.apellido;
    (document.querySelector('ion-input[label="Email"]') as HTMLInputElement).value = this.usuarioOriginal.email;
    (document.querySelector('ion-input[label="Teléfono"]') as HTMLInputElement).value = this.usuarioOriginal.telefono;
    (document.querySelector('ion-input[label="Dirección"]') as HTMLInputElement).value = this.usuarioOriginal.direccion;
  }

  guardarDatos() {
    const datosUsuario = {
      id: this.usuario?.id,
      nombre: (document.querySelector('ion-input[label="Nombre"]') as HTMLInputElement).value,
      apellido: (document.querySelector('ion-input[label="Apellidos"]') as HTMLInputElement).value,
      email: (document.querySelector('ion-input[label="Email"]') as HTMLInputElement).value,
      telefono: (document.querySelector('ion-input[label="Teléfono"]') as HTMLInputElement).value,
      direccion: (document.querySelector('ion-input[label="Dirección"]') as HTMLInputElement).value,
      password: this.usuario?.password,
      url_foto_perfil: this.usuario?.url_foto_perfil,
      tipoUsuario: this.usuario?.tipoUsuario,
      fecha_registro: this.usuario?.fecha_registro,
      cantidad_rescates: this.usuario?.cantidad_rescates
    };

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.put(`${environment.apiUrl}/usuarios`, JSON.stringify(datosUsuario), {
      headers: headers
    }).subscribe(response => {
      this.camposActivos = false;
      this.usuarioOriginal = { ...this.usuario };
    }, error => {
      console.error('Error al guardar los datos:', error);
    });
  }

  cargarImagenPerfil(nombreImagen: string) {
    this.usuarioService.getImagen(nombreImagen).subscribe((imagen: Blob) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPerfil = e.target.result;
      };
      reader.readAsDataURL(imagen);
    });
  }

  cargarImagenesUsuario(userId: string) {
    this.usuarioService.getImagenesUsuario(userId).subscribe((imagenes: any[]) => {
      this.imagenesUsuario = imagenes.map(imagen => {
        return {
          ...imagen,
          url: `${environment.apiUrl}/imagen/${imagen.nombre}`
        };
      });
    }, error => {
      console.error('Error al cargar las imágenes del usuario:', error);
    });
  }

  subirImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const formData = new FormData();
      formData.append('file', file);

      this.http.post<{ url_foto_perfil: string }>(`${environment.apiUrl}/subir-imagen`, formData, {
        headers: headers,
        observe: 'response'
      }).subscribe(response => {
        if (response.status === 200 && response.body) {
          const url_foto_perfil = response.body.url_foto_perfil;
          this.usuario.url_foto_perfil = url_foto_perfil.replace('/imagen/', '');
          setTimeout(() => {
            this.cargarImagenPerfil(this.usuario.url_foto_perfil);
          }, 1000);
        } else {
          console.error('Error al subir la imagen:', response.statusText);
        }
      }, error => {
        console.error('Error al subir la imagen:', error);
      });
    }
  }

  actualizarBadgeRescates(cantidad: number) {
    const badge = document.querySelector('ion-badge');
    if (badge) {
      badge.textContent = cantidad.toString();
    }
  }

  toggleCampoContrasena() {
    this.mostrarCampoContrasena = !this.mostrarCampoContrasena;
  }

  confirmarCambioContrasena() {
    const nuevaContrasena = (document.querySelector('#nuevaContrasena') as HTMLInputElement).value;
    const userId = this.usuario?.id;
    if (userId && nuevaContrasena) {
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const jsonPayload = Number(nuevaContrasena);

      this.http.put(`${environment.apiUrl}/usuarios/${userId}/cambiar-contrasena`, jsonPayload, { headers: headers })
        .subscribe(response => {
          this.mostrarCampoContrasena = false;
        }, error => {
        });
    }
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
