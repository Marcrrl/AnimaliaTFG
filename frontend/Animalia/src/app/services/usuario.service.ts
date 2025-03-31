import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUsuarioById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getImagen(url_foto_perfil: string): Observable<Blob> {
    const url = `${environment.apiUrl}/imagen/${url_foto_perfil}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getImagenesUsuario(userId: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/fotos/usuario/${userId}/base64`);
  }

  subirImagenPerfil(file: File, headers: HttpHeaders): Observable<any> {
    const formData = new FormData();
    formData.append('imagen', file);

    return this.http.post(`${environment.apiUrl}/subir-imagen`, formData, {
      headers: headers,
      observe: 'response'
    });
  }
}
