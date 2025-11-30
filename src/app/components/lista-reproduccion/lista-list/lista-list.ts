import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ListaReproduccionService } from '../../../services/lista-reproduccion.service';
import { AuthService } from '../../../services/auth.service';
import { ListaReproduccion } from '../../../models/lista-reproduccion.model';

@Component({
  selector: 'app-lista-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-list.html',
  styleUrl: './lista-list.css'
})
export class ListaListComponent implements OnInit {
  private listaService = inject(ListaReproduccionService);
  private authService = inject(AuthService);
  private router = inject(Router);

  listas: ListaReproduccion[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadListas();
  }

  loadListas(): void {
    this.isLoading = true;
    this.listaService.getListas().subscribe({
      next: (listas) => {
        this.listas = listas;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar las listas';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  deleteLista(nombre: string): void {
    if (confirm(`¿Estás seguro de eliminar la lista "${nombre}"?`)) {
      this.listaService.deleteLista(nombre).subscribe({
        next: () => {
          this.loadListas();
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar la lista';
          console.error(error);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

