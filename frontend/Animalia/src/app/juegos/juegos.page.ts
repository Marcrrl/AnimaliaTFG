import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface WindowWithPhaser extends Window {
  Phaser?: any;
  gameCompletedCallback?: (experiencia: number) => void;
}

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
  standalone: false,
})
export class JuegosPage implements OnInit, AfterViewInit, OnDestroy {
  private game: any;
  private mainScript: HTMLScriptElement | null = null;
  private phaserScript: HTMLScriptElement | null = null;
  public errorCargando: string = '';

  constructor(private platform: Platform, private http: HttpClient) {}

  ngOnInit() {
    (window as WindowWithPhaser).gameCompletedCallback = (experiencia: number) => {
      this.enviarExperiencia(experiencia);
    };
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      const customWindow = window as WindowWithPhaser;
      if (typeof customWindow.Phaser === 'undefined') {
        this.loadPhaserScript();
      } else {
        this.loadMainScript();
      }
    });
  }

  loadPhaserScript() {
    this.phaserScript = document.createElement('script');
    this.phaserScript.src = 'assets/juegos/phaser.js';
    this.phaserScript.onload = () => {
      this.loadMainScript();
    };
    
    this.phaserScript.onerror = (e) => {
      console.error('Error al cargar Phaser:', e);
      console.error('Ruta de script Phaser:', this.phaserScript?.src);
      this.errorCargando = 'No se pudo cargar Phaser. Verifica que el archivo phaser.js existe en assets/juegos/';
    };
    
    document.body.appendChild(this.phaserScript);
  }

  loadMainScript() {
    this.mainScript = document.createElement('script');
    this.mainScript.type = 'module';
    this.mainScript.src = 'assets/juegos/src/main.js';
    
    fetch(this.mainScript.src)
      .then(response => {
        if (!response.ok) {
          console.error(`HTTP error: ${response.status} ${response.statusText}`);
          this.errorCargando = `No se pudo cargar el juego. Error HTTP: ${response.status}`;
        } else {
          if (this.mainScript) {
            document.body.appendChild(this.mainScript);
          }
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        this.errorCargando = 'Error al acceder al archivo del juego. Comprueba la consola.';
      });
    
    if (this.mainScript) {
      this.mainScript.onload = () => {
      };
      
      this.mainScript.onerror = (e) => {
        console.error('Error al cargar el juego:', e);
        console.error('Ruta de script juego:', this.mainScript?.src);
        this.errorCargando = 'No se pudo cargar el juego. Verifica que el archivo main.js existe en assets/juegos/src/';
      };
    }
  }

  private enviarExperiencia(experiencia: number) {
    const userId = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    
    if (!userId || !token) {
      console.error('No se encontró el ID del usuario o token de autenticación');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post(`${environment.apiUrl}/usuarios/${userId}/agregar-experiencia`, experiencia, { headers })
      .subscribe({
        next: (response: any) => {
        },
        error: (error) => {
          console.error('Error al actualizar la experiencia:', error);
        }
      });
  }

  ngOnDestroy() {
    delete (window as WindowWithPhaser).gameCompletedCallback;
    
    if (this.phaserScript && this.phaserScript.parentNode) {
      this.phaserScript.parentNode.removeChild(this.phaserScript);
    }
    
    if (this.mainScript && this.mainScript.parentNode) {
      this.mainScript.parentNode.removeChild(this.mainScript);
    }
    
    if (this.game) {
      this.game.destroy(true);
    }
  }
}
