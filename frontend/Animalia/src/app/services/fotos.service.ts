import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FotosService {
private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
  }

  getFotos(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fotos?page=${page}`);
  }
  // Obtener todos los animales para calcular el total de páginas
  getTotalFotos() {
    return this.http.get<any>(`${this.apiUrl}/fotos/todos`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fotos/${id}`);
  }

  obtenerImagenUrl(nombreImagen: string): string {
    return `${this.apiUrl}/imagen/${nombreImagen}`;
  }

  obtenerRescatePorIdFoto(id: number) {
    return this.http.get<string>(`${this.apiUrl}/fotos/${id}/rescate`);
  }
  añadirFoto(rescateId: any, usuarioId: any, url_foto: string, descripcion: string, ubicacion: any,headers:any) {

    console.log('Headers:', headers);
    const body = {
      rescateId: rescateId ,
      usuarioId:  usuarioId ,
      url_foto: url_foto,
      descripcion: descripcion,
      ubicacion: ubicacion,
      fecha_captura: new Date().toISOString().split('T')[0] // Fecha actual
    };
    console.log(body);

    return this.http.post(`${this.apiUrl}/fotos/crear`, body,{headers: headers,
      observe: 'response',});
  }
}
