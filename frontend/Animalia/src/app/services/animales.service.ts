import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AnimalesService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getAnimales(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/animales?page=${page}`);
  }
  // Obtener todos los animales para calcular el total de páginas
  getTotalAnimales() {
    return this.http.get<any>(`${this.apiUrl}/animales/todos`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/animales/${id}`);
  }

  obtenerImagenUrl(nombreImagen: string): string {
    return `${this.apiUrl}/imagen/${nombreImagen}`;
  }
}
