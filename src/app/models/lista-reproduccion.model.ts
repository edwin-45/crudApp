import { Cancion } from './cancion.model';

export interface ListaReproduccion {
  id?: number;
  nombre: string;
  descripcion?: string;
  canciones: Cancion[];
}
