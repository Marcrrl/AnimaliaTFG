import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EmpresasService } from '../services/empresas.service';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalles-empresa',
  templateUrl: './detalles-empresa.page.html',
  styleUrls: ['./detalles-empresa.page.scss'],
  standalone: false,
})
export class DetallesEmpresaPage implements OnInit {
  id: number | null = null;
  empresa: any;
  public mapInitialized: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private empresasService: EmpresasService
  ) {}


  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.empresasService.getById(this.id).subscribe(
      (data) => {
        this.empresa = data;
      },
      (error) => {
        console.error('Error fetching empresa details:', error);
      }
    );
  }

}



