import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  tipo: string = '';
  user: any = {};
  errorMessage: string = '';
  newUsuario: any = {};
  newEmpresa: any = {};

  constructor(private http: HttpClient, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  showContent(tipo: string) {
    this.tipo = tipo;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  addUsuario() {
    this.newUsuario.tipoUsuario = 'USER';
    //this.newUsuario.fecha_registro = new Date().toISOString().split('T')[0]; // Set default fecha_registro
    //console.log('Sending user data:', JSON.stringify(this.newUsuario)); // Log JSON data
    this.http.post('http://backend:9000/auth/add', this.newUsuario).subscribe(() => {
      this.errorMessage = '';
      this.newUsuario = {}; // Reset form
      this.presentToast('Usuario creado exitosamente');
      this.router.navigate(['/IniciarSesion']); // Navigate to login page
    }, error => {
      console.error('Error al añadir usuario:', error);
      if (error.status === 400 && error.error.message.includes('telefono ya existe')) {
        this.errorMessage = 'El teléfono ya existe. Por favor, use un número diferente.';
      } else {
        this.errorMessage = 'Error al añadir usuario. Por favor, inténtelo de nuevo.';
      }
    });
  }
  addEmpresa() {
    //this.newEmpresa.tipoUsuario = 'EMPRESA';
    //this.newUsuario.fecha_registro = new Date().toISOString().split('T')[0]; // Set default fecha_registro
    console.log('Sending user data:', JSON.stringify(this.newEmpresa)); // Log JSON data
    this.http.post(`${environment.apiUrl}/empresas/crear-con-usuario`, this.newEmpresa).subscribe(() => {
      this.errorMessage = '';
      this.newEmpresa = {}; // Reset form
      this.presentToast('Empresa creada exitosamente');
      this.router.navigate(['/IniciarSesion']); // Navigate to login page
    }, error => {
      console.error('Error al añadir usuario:', error);
      if (error.status === 400 && error.error.message.includes('telefono ya existe')) {
        this.errorMessage = 'El teléfono ya existe. Por favor, use un número diferente.';
      } else {
        this.errorMessage = 'Error al añadir usuario. Por favor, inténtelo de nuevo.';
      }
    });
  }
}