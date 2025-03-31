import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalesService } from '../services/animales.service';
import { FotosService } from '../services/fotos.service';
import { RescatesService } from '../services/rescates.service';

@Component({
  selector: 'app-detalles-animal',
  templateUrl: './detalles-animal.page.html',
  styleUrls: ['./detalles-animal.page.scss'],
  standalone: false,
})
export class DetallesAnimalPage implements OnInit {
  id: number | null = null;
  animal: any;
  tipo: any;
  rescateId: any;
  rescate: any;
foto:any;
  public imagen: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private animalesService: AnimalesService,
    private fotosService: FotosService,
    private rescateService: RescatesService
  ) {}

  ngOnInit() {
    // Capturar el id_animal desde la ruta
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.tipo = this.route.snapshot.paramMap.get('tipo') || '';
    if (this.tipo == 'animal') {
      console.log(this.tipo);
      this.animalesService.getById(this.id).subscribe(
        (data) => {
          this.animal = {
            ...data,
            estado_conservacion: data.estado_conservacion.replace(/_/g, ' '),
          };

          this.imagen = this.animalesService.obtenerImagenUrl(this.animal.foto);
        },
        (error) => {
          console.error('Error fetching animal details:', error);
        }
      );
    } else if (this.tipo == 'foto') {

console.log(this.tipo);
      this.fotosService.getById(this.id).subscribe((data) => {
this.foto=data;
        this.imagen = this.fotosService.obtenerImagenUrl(data.url_foto);

      });

      this.fotosService.obtenerRescatePorIdFoto(this.id).subscribe(
        (data) => {
          this.rescateId = data;

          this.rescateService.getById(this.rescateId).subscribe(
            (rescateData) => {
              this.rescate = rescateData;
              console.log(this.rescate);

              if (this.rescate?.animal?.id) {
                this.animalesService
                  .getById(this.rescate.animal.id)
                  .subscribe(
                    (animalData) => {
                      this.animal = {
                        ...animalData,
                        estado_conservacion:
                          animalData.estado_conservacion.replace(/_/g, ' '),
                      };
                    },
                    (error) => {
                      console.error(
                        'Error al obtener los detalles del animal:',
                        error
                      );
                    }
                  );
              } else {
                console.error('El rescate no tiene un animal asociado.');
              }
            },
            (error) => {
              console.error(
                'Error al obtener los detalles del rescate:',
                error
              );
            }
          );
        },
        (error) => {
          console.error('Error al obtener el ID del rescate:', error);
        }
      );
    }
  }
}
