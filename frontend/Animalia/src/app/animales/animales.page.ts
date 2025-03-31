import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AnimalesService } from '../services/animales.service';
import { Router } from '@angular/router';
import {
  MenuController,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
  standalone: false,
})
export class AnimalesPage implements OnInit {
  public animales: any[] = [];
  public filteredAnimals: any[] = [];
  //filteredAnimals: any[] = [];
  public showList = false;
  public selectedFamilia: string | null = null;
  menuType: string = 'overlay';
  public isMenuOpen: boolean = false;

  totalAnimales: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;  // Página para el backend
  currentPagehtml: number = 1; // Página que se mostrará en el HTML (empieza desde 1)
  itemsPerPage: number = 5;
  paginaActual: any[] = [];  // Página para el backend

  constructor(
    private animalesService: AnimalesService,
    private router: Router,
    private menuCtrl: MenuController,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Obtener todos los animales al iniciar
    this.animalesService.getTotalAnimales().subscribe((animales: any[]) => {
      this.animales = animales.map((animal: any) => ({
        ...animal,
        estado_conservacion: animal.estado_conservacion.replace(/_/g, ' ')
      }));
      this.filteredAnimals = [...this.animales];
      this.totalAnimales = this.filteredAnimals.length;
      this.totalPages = Math.ceil(this.totalAnimales / this.itemsPerPage);

      this.currentPage = 0;
      this.currentPagehtml = 1;
      this.actualizarPagina();
    });
  }


  loadAnimales(event?: any) {
    this.animalesService.getAnimales(this.currentPage).subscribe((animales: any[]) => {
      this.animales = animales;

      if (event) {
        event.target.complete();
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.currentPagehtml++;
      this.actualizarPagina();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.currentPagehtml--;
      this.actualizarPagina();
    }
  }

  getImagen(animal: any): string {
    return this.animalesService.obtenerImagenUrl(animal.foto);
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase().trim() || '';
    this.searchAnimals(query);
  }

  handleSearchbarClick() {
    const searchbar = document.querySelector('ion-searchbar');
    const query = searchbar?.value?.trim().toLowerCase() || '';

    this.searchAnimals(query);
  }


  searchAnimals(query: string) {
    this.currentPage = 0;
    if (query === '') {
      this.filteredAnimals = [...this.animales];
    } else {
      this.filteredAnimals = this.animales.filter((d: any) =>
        d.nombre_comun.toLowerCase().includes(query)
      );
    }
    this.actualizarPagina();
  }

  showAllAnimals() {
    this.ngOnInit();
  }

  haciaDatosAnimal(id_animal: number) {
    this.router.navigate(['/detalles-animal', id_animal,"animal"]);
    console.log('ID del animal:', id_animal);
  }

  haciaMapa(tipo: string) {
    this.router.navigate(['/mapa', tipo]);
  }

  cambioFamilia(familia: string | null) {
    if (this.selectedFamilia === familia) {

      this.selectedFamilia = null;
      this.filteredAnimals = [...this.animales];
    } else {
      console.log('Familia seleccionada:', familia);
      this.selectedFamilia = familia;
      this.filteredAnimals = this.animales.filter((animal: any) => animal.familia === familia);
    }


    this.totalAnimales = this.filteredAnimals.length;
    this.totalPages = Math.ceil(this.totalAnimales / this.itemsPerPage);

    this.currentPage = 0;
    this.currentPagehtml = 1;
    this.actualizarPagina();
  }

  actualizarPagina() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginaActual = this.filteredAnimals.slice(start, end);
  }

  isFamiliaSelected(familia: string): boolean {
    return this.selectedFamilia === familia;
  }

  openEndMenu() {
    this.menuCtrl.enable(true, 'end');
    this.menuCtrl.open('end');
    this.toggleStickySearchbar(false);
    this.isMenuOpen = true;
  }

  closeEndMenu() {
    this.menuCtrl.close('end');
    this.toggleStickySearchbar(true);
    this.isMenuOpen = false;
    console.log('Menu cerrado');
  }

  toggleStickySearchbar(isSticky: boolean) {
    const searchbar = document.querySelector('ion-searchbar');
    if (searchbar) {
      if (isSticky) {
        searchbar.classList.add('sticky-top');
      } else {
        searchbar.classList.remove('sticky-top');
      }
    }
  }

  makeCall(number: string) {
    window.open(`tel:${number}`, '_system');
  }
}
