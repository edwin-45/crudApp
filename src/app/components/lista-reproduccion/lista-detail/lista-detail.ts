import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListaReproduccionService } from '../../../services/lista-reproduccion.service';
import { ListaReproduccion } from '../../../models/lista-reproduccion.model';
import { Cancion } from '../../../models/cancion.model';

@Component({
  selector: 'app-lista-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './lista-detail.html',
  styleUrl: './lista-detail.css'
})
export class ListaDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private listaService = inject(ListaReproduccionService);

  lista: ListaReproduccion | null = null;
  isLoading = false;
  errorMessage = '';
  showAddCancionForm = false;

  nuevaCancion: Cancion = {
    titulo: '',
    artista: '',
    album: '',
    genero: ''
  };

  ngOnInit(): void {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    if (nombre) {
      this.loadLista(nombre);
    }
  }

  loadLista(nombre: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.listaService.getListaByNombre(nombre).subscribe({
      next: (lista) => {
        this.lista = lista;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar la lista';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  toggleAddCancionForm(): void {
    this.showAddCancionForm = !this.showAddCancionForm;
    if (!this.showAddCancionForm) {
      this.resetCancionForm();
    }
  }

  addCancion(): void {
    if (!this.lista || !this.validarCancion()) {
      return;
    }

    this.isLoading = true;
    this.listaService.addCancion(this.lista.nombre, this.nuevaCancion).subscribe({
      next: (listaActualizada) => {
        this.lista = listaActualizada;
        this.showAddCancionForm = false;
        this.resetCancionForm();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al agregar la canción';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  removeCancion(cancionId: number | undefined): void {
    if (!this.lista || !cancionId) return;

    if (confirm('¿Estás seguro de eliminar esta canción?')) {
      this.listaService.removeCancion(this.lista.nombre, cancionId).subscribe({
        next: (listaActualizada) => {
          this.lista = listaActualizada;
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar la canción';
          console.error(error);
        }
      });
    }
  }

  deleteLista(): void {
    if (!this.lista) return;

    if (confirm(`¿Estás seguro de eliminar la lista "${this.lista.nombre}"?`)) {
      this.listaService.deleteLista(this.lista.nombre).subscribe({
        next: () => {
          this.router.navigate(['/listas']);
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar la lista';
          console.error(error);
        }
      });
    }
  }

  validarCancion(): boolean {
    if (!this.nuevaCancion.titulo || !this.nuevaCancion.artista) {
      this.errorMessage = 'Título y artista son obligatorios';
      return false;
    }
    return true;
  }

  resetCancionForm(): void {
    this.nuevaCancion = {
      titulo: '',
      artista: '',
      album: '',
      genero: ''
    };
    this.errorMessage = '';
  }

  goBack(): void {
    this.router.navigate(['/listas']);
  }
}
