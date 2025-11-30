import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ListaReproduccion } from '../models/lista-reproduccion.model';
import { Cancion } from '../models/cancion.model';

@Injectable({
  providedIn: 'root'
})
export class ListaReproduccionService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:8080/lists';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getListas(): Observable<ListaReproduccion[]> {
    return this.http.get<ListaReproduccion[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getListaByNombre(nombre: string): Observable<ListaReproduccion> {
    return this.http.get<ListaReproduccion>(`${this.apiUrl}/${nombre}`, {
      headers: this.getHeaders()
    });
  }

  createLista(lista: ListaReproduccion): Observable<ListaReproduccion> {
    return this.http.post<ListaReproduccion>(this.apiUrl, lista, {
      headers: this.getHeaders()
    });
  }

  updateLista(nombre: string, lista: ListaReproduccion): Observable<ListaReproduccion> {
    return this.http.put<ListaReproduccion>(`${this.apiUrl}/${nombre}`, lista, {
      headers: this.getHeaders()
    });
  }

  deleteLista(nombre: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${nombre}`, {
      headers: this.getHeaders()
    });
  }

  addCancion(nombreLista: string, cancion: Cancion): Observable<ListaReproduccion> {
    return this.http.post<ListaReproduccion>(
      `${this.apiUrl}/${nombreLista}/canciones`,
      cancion,
      { headers: this.getHeaders() }
    );
  }

  removeCancion(nombreLista: string, cancionId: number): Observable<ListaReproduccion> {
    return this.http.delete<ListaReproduccion>(
      `${this.apiUrl}/${nombreLista}/canciones/${cancionId}`,
      { headers: this.getHeaders() }
    );
  }
}
