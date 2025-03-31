import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-rescates',
  templateUrl: './rescates.page.html',
  styleUrls: ['./rescates.page.scss'],
  standalone: false,
})
export class RescatesPage implements OnInit {
  todosRescates: any[] = [];
  rescatesAsignados: any[] = [];
  tabActual: string = 'todosRescates';
  empresaId: number = 0;
  isModalOpen: boolean = false;
  fotosRescate: any[] = [];
  environment = environment;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.cargarTodosRescates();
  }

  cargarTodosRescates() {
    this.http.get(`${environment.apiUrl}/rescates/detalle`).subscribe((data: any) => {
      this.todosRescates = data;
      this.todosRescates.forEach(rescate => {
      });
      this.cargarRescatesAsignados();
    });
  }

  cargarRescatesAsignados() {
    const usuarioId = sessionStorage.getItem('id');
    if (usuarioId) {
      this.http.get(`${environment.apiUrl}/usuarios/${usuarioId}/empresa`, { responseType: 'text' }).subscribe((response: string) => {
        const empresaId = Number(response);
        this.http.get(`${environment.apiUrl}/rescates/empresa/${empresaId}/rescates`).subscribe((data: any) => {
          this.rescatesAsignados = data;
        });
      });
    } else {
      console.error('Usuario no identificado');
    }
  }

  mostrarTab(tab: string) {
    this.tabActual = tab;
  }

  tieneEmpresaAsignada(rescate: any): string {
    return rescate.nombreEmpresa && rescate.nombreEmpresa.trim() !== '' ? rescate.nombreEmpresa : '(Sin asignar)';
  }

  asignarEmpresa(rescateId: number, empresaId: number) {
    const usuarioId = sessionStorage.getItem('id');
    if (!usuarioId) {
      console.error('Usuario no identificado');
      return;
    }
    const rescate = this.todosRescates.find(r => r.id === rescateId);

    this.http.get<any[]>(`${environment.apiUrl}/empresas/todos`).subscribe((empresas) => {
      this.http.get(`${environment.apiUrl}/usuarios/${usuarioId}/empresa`, { responseType: 'text' }).subscribe((response: string) => {
        const empresaIdUsuario = Number(response);
        const empresa = empresas.find(e => e.id === empresaIdUsuario);
        if (empresa) {
          const body = {
            id: rescateId,
            nombreEmpresa: empresa.nombre,
            nombreUsuario: rescate.nombreUsuario,
            nombreAnimal: rescate.nombreAnimal,
            ubicacion: rescate.ubicacion,
            estadoRescate: 'ASIGNADO',
            estadoAnimal: rescate.estadoAnimal,
            fechaRescate: rescate.fechaRescate
          };

          const url = `${environment.apiUrl}/rescates/${rescateId}?empresaId=${empresa.id}&usuarioId=${usuarioId}`;

          this.http.put(url, body).subscribe(() => {
            location.reload();
          });
        }
      });
    });
  }

  abrirModal(idRescate: number) {
    this.http.get<any[]>(`${environment.apiUrl}/rescates/${idRescate}/fotos`).subscribe((data: any[]) => {
      this.fotosRescate = data;
      this.isModalOpen = true;
    });
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.fotosRescate = [];
  }
}