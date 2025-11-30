import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ListaReproduccionService } from '../../../services/lista-reproduccion.service';
import { ListaReproduccion } from '../../../models/lista-reproduccion.model';

@Component({
  selector: 'app-lista-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-form.html',
  styleUrl: './lista-form.css'
})
export class ListaFormComponent {
  private listaService = inject(ListaReproduccionService);
  private router = inject(Router);

  lista: ListaReproduccion = {
    nombre: '',
    descripcion: '',
    canciones: []
  };

  isLoading = false;
  errorMessage = '';

  onSubmit(): void {
    if (!this.lista.nombre || !this.lista.descripcion) {
      this.errorMessage = 'Completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.listaService.createLista(this.lista).subscribe({
      next: () => {
        this.router.navigate(['/listas']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al crear la lista. El nombre puede estar en uso.';
        console.error(error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/listas']);
  }
}

