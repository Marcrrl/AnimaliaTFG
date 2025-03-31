import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false
})
export class InicioPage implements OnInit {

  constructor() { }

  ngOnInit() {
    const video: HTMLVideoElement = document.getElementById('videoElement') as HTMLVideoElement;
    video.muted = true;
    video.play().catch(error => console.log('Error al reproducir:', error));
  }
}
