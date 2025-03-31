import { RescatesService } from './../services/rescates.service';
import { UsuarioService } from './../services/usuario.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { AnimalesService } from '../services/animales.service';
import { FotosService } from '../services/fotos.service';
import { set } from 'lodash';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-Camara',
  templateUrl: 'Camara.page.html',
  styleUrls: ['Camara.page.scss'],
  standalone: false,
})
export class CamaraPage implements OnInit {
  //variablkes nuevas
  rescates: any[] = [];
  rescatesFiltrados: any[] = [];
  fotosFiltradas: any[] = [];
  estadoAnimal: string = '';
  rescateId: any;
  nombreFoto: string = '';
  foto: string = ''; // Para almacenar la ruta de la foto
  file: File | null = null;
  public animales: any[] = [];
  results: any[] = [];
  animalSeleccionadoId: any = null;
  descripcion: string = '';
  ubicacion: string = '';
  usuario: any;
  usuarioOriginal: any;
  estadoOpciones: string[] = [
    'LEVE',
    'MODERADO',
    'GRAVE',
    'FALLECIDO',
    'DESCONOCIDO',
    'SANO',
  ];
  rescateOk: boolean = false;
  constructor(
    private http: HttpClient,
    private animalesService: AnimalesService,
    private fotosService: FotosService,
    private usuarioService: UsuarioService,
    private rescatesService: RescatesService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.nombreFoto = '';
    this.descripcion = '';
    this.ubicacion = '';
    this.rescateOk = false;
    this.animalSeleccionadoId = null;
    this.animalesService.getTotalAnimales().subscribe((animales) => {
      this.animales = animales; // Guardar todos los animales en la lista principal
      this.results = [...this.animales];
    });

    const userId = sessionStorage.getItem('id');
    if (userId) {
      this.usuarioService.getUsuarioById(userId).subscribe((data: any) => {
        this.usuario = data;
        this.usuarioOriginal = { ...this.usuario };
      });
    } else {
      console.error('No se encontró el id del usuario');
    }
    // Obtener todos los rescates una sola vez
    this.rescatesService.getTodosRescates().subscribe((data) => {
      this.rescates = data;
    });
    this.animalesService.getTotalAnimales().subscribe((animales) => {
      this.animales = animales; // Guardar todos los animales en la lista principal
      console.log('Animales:', this.animales);
    });



    this.obtenerUbicacionPoint();
  }

  onRescateClick(rescateId: number) {
    this.rescateId = rescateId;
    console.log('Rescate seleccionado:', this.rescateId);
  }

  getImagen(foto: any): string {
    //console.log('Foto:', foto.url_foto);
    return this.fotosService.obtenerImagenUrl(foto.url_foto);
  }

  getRescatePorIdFoto(idFoto: number) {
    this.fotosService.obtenerRescatePorIdFoto(idFoto).subscribe({
      next: (id) => {
        this.rescateId = id;
        console.log('ID del rescate:', id);
      },
      error: (err) => console.error('Error obteniendo el ID del rescate', err),
    });
  }



  filtrarRescates() {
    this.rescatesFiltrados = this.rescates.filter(
      (rescate) =>
        rescate.animal.id === this.animalSeleccionadoId &&
        rescate.estado_rescate === 'NO_ASIGNADO'
    );

    console.log('Rescates :', this.rescatesFiltrados);
    /*no estoy usando esta lista , pero no quitarla*/
    this.fotosFiltradas = this.rescatesFiltrados.flatMap((rescate) =>
      rescate.fotos.map((foto: any) => ({
        ...foto,
        url: this.fotosService.obtenerImagenUrl(foto.url_foto),
      }))
    );

    console.log('Fotos filtradas:', this.fotosFiltradas);
  }

  resetRescateSeleccionadoId() {
    this.rescateId = null;
    console.log('Rescate a null:', this.rescateId);
  }

  editarRescate() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

const body={
ubicacion:this.ubicacion,
estadoAnimal:this.estadoAnimal
}
    this.rescatesService
      .editarRescate(this.rescateId, body/*this.ubicacion*/, headers)
      .subscribe({
        next: (response) => {
          console.log('Rescate editado', response);
        },
        error: (error) => {
          console.error('Error al editar el rescate', error);
        },
        complete: () => {
          console.log('Proceso de editar rescate completado.');
          console.log('Se va aredirigir a la pagina de inicio');
          this.finalizarRescate();
        },
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      icon: 'alert-outline',
    });
    toast.present();
  }

  async subirRescate() {
    try {
      if (
        this.foto &&
        this.usuarioOriginal &&
        this.nombreFoto &&
        this.descripcion &&
        this.ubicacion &&
        this.estadoAnimal
      ) {
        /*PUT*/
        if (this.rescateId) {
          console.log('Editando Rescate');
          await this.subirImagen();
          await this.editarRescate();
          this.finalizarRescate();
        } else {
          console.log('Añadiendo Rescate');
          /*POST*/
          if (
            this.animalSeleccionadoId &&
            this.estadoAnimal &&
            this.ubicacion &&
            this.usuarioOriginal &&
            this.foto
          ) {
            const token = sessionStorage.getItem('token');
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            });
            // Crear un nuevo rescate
            const nuevoRescate = {
              animalId: this.animalSeleccionadoId,

              estadoAnimal: this.estadoAnimal,
              ubicacion: this.ubicacion,
              usuarioId: this.usuarioOriginal.id,
            };

            this.rescatesService.añadirRescate(nuevoRescate, headers).subscribe({
              next:async (response) => {
                this.rescateId = (response.body as any).id;
                console.log('Rescate agregado con ID:', this.rescateId);

               await this.subirImagen();
               this.finalizarRescate();
              },
              error: (error) => {
                console.error('Error al agregar el rescate', error);
              },
              complete: () => {
                console.log('Proceso de añadir rescate completado.');
              },
            });

            // const response = await firstValueFrom(
            //   this.rescatesService.añadirRescate(nuevoRescate, headers)
            // ); // Convertimos el Observable en Promise
            // this.rescateId = (response as any).id;
            // console.log('Rescate agregado con ID:', this.rescateId);
            // await this.subirImagen();
          } else {
            this.presentToast('Falta algun dato');
            console.log('Faltan datos');
          }
        }
      } else {
        this.presentToast('Falta algun dato');
        console.log('Faltan datos');
      }


    } catch (error) {
      console.error('Error en el proceso de rescate:', error);
    }
  }

  finalizarRescate() {
    if (this.rescateOk) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

  async obtenerUbicacionPoint() {
    try {
      let latitude: number;
      let longitude: number;

      if ('geolocation' in navigator) {
        // Usar navigator.geolocation con Promises
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );

        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      } else {
        // Usar Capacitor Geolocation
        const coordinates = await Geolocation.getCurrentPosition();
        latitude = coordinates.coords.latitude;
        longitude = coordinates.coords.longitude;
      }

      // Actualizar el formulario con el nuevo punto
      // this.fotoForm.patchValue({
      //   ubicacion: point,
      // });
      this.ubicacion = latitude + '|' + longitude;
    } catch (error) {
      console.error('Error obteniendo ubicación', error);
    }
  }

  // Método para tomar una foto
  async takePicture() {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      this.foto = photo.webPath || ' ';

      if (photo.webPath) {
        this.file = await this.convertToFile(photo.webPath);
        console.log(this.file);
      }
    } catch (error) {
      console.log('Error al tomar la foto', error);
    }
  }

  subirImagen(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(
        'Rescate:' + this.rescateId,
        'usuario:' + parseInt(this.usuarioOriginal.id),
        'Foto:' + this.nombreFoto,
        this.descripcion,
        this.ubicacion
      );
      if (
        this.rescateId &&
        this.usuarioOriginal &&
        this.nombreFoto &&
        this.descripcion &&
        this.ubicacion
      ) {
        const token = sessionStorage.getItem('token');
        console.log('Token:', token);
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        const formData = new FormData();

        if (this.file) {
          console.log('Subiendo archivo:', this.file);
          formData.append('file', this.file);
        }

        this.http
          .post(`${environment.apiUrl}/subir-imagen`, formData, {
            headers: headers,
            observe: 'response',
          })
          .subscribe({
            next: async (response) => {
              if (response.status === 200 && response.body) {
                console.log('Foto guardada con éxito', response);

                try {
                  await this.enviarAnimalRescate();
                  resolve();
                } catch (error) {
                  console.error('Error en enviarAnimalRescate:', error);
                  reject(error);
                }
              } else {
                console.error('Error al subir la imagen:', response.statusText);
                reject(response.statusText);
              }
            },
            error: (error) => {
              console.error('Error al subir la imagen:', error);
              reject(error);
            },
          });
      } else {
        console.log('Faltan datos');
      }
    });
  }

  async convertToFile(webPath: string): Promise<File> {
    const response = await fetch(webPath);
    const blob = await response.blob();
    this.nombreFoto = `photo_${Date.now()}.jpg`;
    console.log(this.nombreFoto);
    const file = new File([blob], this.nombreFoto, { type: blob.type });
    return file;
  }

  enviarAnimalRescate(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(
        'Rescate:' + this.rescateId,
        'usuario:' + parseInt(this.usuarioOriginal.id),
        this.nombreFoto,
        this.descripcion,
        this.ubicacion
      );
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      this.fotosService
        .añadirFoto(
          this.rescateId,
          this.usuarioOriginal.id,
          this.nombreFoto,
          this.descripcion,
          this.ubicacion,
          headers
        )
        .subscribe({
          next: (response) => {
            console.log('Foto agregada', response);
            resolve();
          },
          error: (error) => {
            console.error('Error al agregar la foto', error);
          },
          complete: () => {
            console.log('Proceso de añadir foto completado.');

            this.rescateOk = true;
          },
        });
    });
  }

}
