import { Component, OnInit } from '@angular/core';
import { AnimalesService } from '../services/animales.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { EmpresasService } from '../services/empresas.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
  standalone: false,
})
export class EmpresasPage implements OnInit {
  public empresas: any[] = [];
  public filteredEmpresas: any[] = [];
  menuType: string = 'overlay';
  public isMenuOpen: boolean = false;

  totalEmpresas: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  currentPagehtml: number = 1;
  itemsPerPage: number = 5;
  paginaActual: any[] = [];


  public showList = false;
  public selectedFamilia: string | null = null;


  public selectedTipo: string | null = null;
  constructor(
    private empresasService: EmpresasService,
    private router: Router,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {

    this.empresasService.getTotalEmpresas().subscribe((empresas) => {
      this.empresas = empresas;
      this.filteredEmpresas = [...this.empresas];
      this.totalEmpresas = this.filteredEmpresas.length;
      this.totalPages = Math.ceil(this.totalEmpresas / this.itemsPerPage);

      this.currentPage = 0;
      this.currentPagehtml = 1;
      this.actualizarPagina();
    });
  }


  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase().trim() || '';
    this.searchEmpresas(query);
  }


  handleSearchbarClick() {
    const searchbar = document.querySelector('ion-searchbar');
    const query = searchbar?.value?.trim().toLowerCase() || '';

    this.searchEmpresas(query);
  }

  searchEmpresas(query: string) {
    this.currentPage = 0;
    if (query === '') {
      this.filteredEmpresas = [...this.empresas];
    } else {
      this.filteredEmpresas = this.empresas.filter((d: any) =>
        d.nombre.toLowerCase().includes(query)
      );
    }
    this.actualizarPagina();
  }

  actualizarPagina() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginaActual = this.filteredEmpresas.slice(start, end);
  }
  haciaDatosEmpresa(id: number) {
    this.router.navigate(['/detalles-empresa', id]);
    console.log('ID de la empresa:', id);
  }


  isEmpresaSelected(tipo: string): boolean {
    return this.selectedTipo === tipo;
  }

  haciaMapa(tipo: string) {
    this.router.navigate(['/mapa', tipo]);
  }
  openEndMenu() {
    this.menuCtrl.enable(true, 'end-empresas');
    this.menuCtrl.open('end-empresas');
    this.toggleStickySearchbar(false);
    this.isMenuOpen = true;
  }

  closeEndMenu() {
    this.menuCtrl.close('end-empresas');
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
  showAllEmpresas() {
    this.ngOnInit();
  }




  cambioTipo(tipo: string) {
    if (this.selectedTipo === tipo) {
      this.selectedTipo = null;
      this.showAllEmpresas();
    } else {
      this.selectedTipo = tipo;
      this.filteredEmpresas = this.empresas.filter((d: any) => d.tipo === tipo);
    }
    this.currentPage = 0;
    this.actualizarPagina();
  }

  makeCall(number: string) {
    window.open(`tel:${number}`, '_system');
  }

  loadEmpresas(event?: any) {
    this.empresasService
      .getEmpresas(this.currentPage)
      .subscribe((empresas: any[]) => {
        this.empresas = empresas;

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
}
