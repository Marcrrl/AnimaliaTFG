import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresasService } from '../services/empresas.service';
import { HttpClient } from '@angular/common/http';
import { AnimalesService } from '../services/animales.service';
import { FotosService } from '../services/fotos.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './Mapa.page.html',
  styleUrls: ['./Mapa.page.scss'],
  standalone: false,
})
export class MapaPage {
  private map!: L.Map;
  private mapContainerId = 'map';
  datos: any[] = [];
  private markers: L.Marker[] = [];
  public mapInitialized: boolean = false;
  tipo: string = '';

  constructor(
    private router: Router,
    private empresaService: EmpresasService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private animalesService: AnimalesService,
    private fotosService: FotosService
  ) { }

  ionViewWillEnter() {
    this.cargarEmpresas();
  }

  async cargarEmpresas() {

    this.tipo = String(this.route.snapshot.paramMap.get('tipo'));
    let data: any[] = [];
    try {
      if (this.tipo == 'empresas') {
        data = await this.empresaService.getTotalEmpresas().toPromise();
        {
          this.datos = await Promise.all(
            data.map(async (dato: any) => {
              try {
                const coords = await this.geocodificarDireccion(dato.direccion);
                return { ...dato, latitud: coords.lat, longitud: coords.lon };
              } catch (error) {
                console.error(`Error al geocodificar ${dato.nombre}:`, error);
                return null;
              }
            })
          );
          console.log(this.datos);
        }
      } else if (this.tipo == 'animales') {
        data = await this.fotosService.getTotalFotos().toPromise();
        {
          this.datos = await Promise.all(
            data.map(async (dato: any) => {
              try {

                const [lat, lon] = dato.ubicacion.split('|').map(Number);
                return { ...dato, latitud: lat, longitud: lon };
              } catch (error) {
                console.error(`Error al geocodificar ${dato.nombre}:`, error);
                return null;
              }
            })
          );
          console.log(this.datos);
        }

      }
      this.datos = this.datos.filter((e) => e !== null);
      this.ionViewDidEnter();
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  geocodificarDireccion(
    direccion: string
  ): Promise<{ lat: number; lon: number }> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      direccion
    )}`;

    return this.http
      .get<any[]>(url)
      .toPromise()
      .then((response) => {
        if (response && response.length > 0) {
          return {
            lat: parseFloat(response[0].lat),
            lon: parseFloat(response[0].lon),
          };
        } else {
          throw new Error('No se encontraron coordenadas');
        }
      });
  }

  ionViewDidEnter() {
    if (this.datos.length === 0) {
      return;
    }

    if (!this.mapInitialized) {
      this.map = L.map(this.mapContainerId).setView(
        [this.datos[0].latitud, this.datos[0].longitud],
        14
      );

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);

      this.mapInitialized = true;
    } else {
      //this.map.setView([this.empresas[0].latitud, this.empresas[0].longitud], 13);
    }

    // Limpiar marcadores previos antes de agregar nuevos
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];

    let customIcon: L.Icon;
    if (this.tipo == 'animales') {
      customIcon = L.icon({
        iconUrl: 'assets/icon/animalMap.png',
        iconSize: [60, 60],
        iconAnchor: [16, 32],
      });
      // Agregar marcadores
      this.datos.forEach((dato) => {
        console.log(dato.latitud, dato.longitud);
        const marker = L.marker([dato.latitud, dato.longitud], {
          icon: customIcon,
        })
          .addTo(this.map)
          .bindTooltip(`<b>${dato.descripcion} </b>`, {
            permanent: false,
            direction: 'top',
            offset: [13.5, -30],
          });

        marker.on('click', () => {
          this.router.navigate(['/detalles-animal', dato.id,"foto"]);
        });
      });
    } else if (this.tipo == 'empresas') {
      customIcon = L.icon({
        iconUrl: 'assets/icon/empresaMap.png',
        iconSize: [60, 60],
        iconAnchor: [16, 32],
      });
      // Agregar marcadores
      this.datos.forEach((dato) => {
        const marker = L.marker([dato.latitud, dato.longitud], {
          icon: customIcon,
        })
          .addTo(this.map)

          .bindTooltip(`<b>${dato.nombre}</b><br>${dato.direccion}`, {
            permanent: false,
            direction: 'top',
            offset: [13.5, -30],
          });
        marker.on('click', () => {
          this.router.navigate(['/detalles-empresa', dato.id]);
        });
      });
    }

    // Asegurar que el mapa se redimensione bien
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 300);

    this.map.zoomControl.setPosition('topleft');
  }
}
