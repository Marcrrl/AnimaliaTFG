import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.page.html',
  styleUrls: ['./sign-form.page.scss'],
  standalone: false
})
export class SignFormPage implements OnInit, AfterViewInit {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    const usernameInput = document.querySelector('.email') as HTMLInputElement;
    const passwordInput = document.querySelector('.password') as HTMLInputElement;
    const showPasswordButton = document.querySelector('.password-button') as HTMLButtonElement;
    const face = document.querySelector('.face') as HTMLElement;
    const iconoContraseña = document.querySelector('.iconoContraseña') as HTMLElement;
    const form = document.querySelector('.login') as HTMLDivElement; // Updated selector
    if (usernameInput && passwordInput && showPasswordButton && face && iconoContraseña) {
      usernameInput.addEventListener('input', (event: Event) => {
        this.email = (event.target as HTMLInputElement).value;
      });

      passwordInput.addEventListener('input', (event: Event) => {
        this.password = (event.target as HTMLInputElement).value;
      });

      passwordInput.addEventListener('focus', (event: FocusEvent) => {
        document.querySelectorAll('.hand').forEach(hand => {
          hand.classList.add('hide');
        });
        document.querySelector('.tongue')?.classList.remove('breath');
      });

      passwordInput.addEventListener('blur', (event: FocusEvent) => {
        document.querySelectorAll('.hand').forEach(hand => {
          hand.classList.remove('hide');
          hand.classList.remove('peek');
        });
        document.querySelector('.tongue')?.classList.add('breath');
      });

      usernameInput.addEventListener('focus', (event: FocusEvent) => {
        const length = Math.min(usernameInput.value.length - 16, 19);
        document.querySelectorAll('.hand').forEach(hand => {
          hand.classList.remove('hide');
          hand.classList.remove('peek');
        });

        face.style.setProperty('--rotate-head', `${-length}deg`);
      });

      usernameInput.addEventListener('blur', (event: FocusEvent) => {
        face.style.setProperty('--rotate-head', '0deg');
      });

      usernameInput.addEventListener('input', _.throttle((event: Event) => {
        const length = Math.min((event.target as HTMLInputElement).value.length - 16, 19);
        face.style.setProperty('--rotate-head', `${-length}deg`);
      }, 100));

      showPasswordButton.addEventListener('click', (event: MouseEvent) => {
        if (passwordInput.type === 'text') {
          passwordInput.type = 'password';
          iconoContraseña.setAttribute('name', 'eye-outline');
          document.querySelectorAll('.hand').forEach(hand => {
            hand.classList.remove('peek');
            hand.classList.add('hide');
          });
        } else {
          passwordInput.type = 'text';
          iconoContraseña.setAttribute('name', 'eye-off-outline');
          document.querySelectorAll('.hand').forEach(hand => {
            hand.classList.remove('hide');
            hand.classList.add('peek');
          });
        }
      });
    }
    if (form) {
      form.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          this.login();
        }
      });
    }
  }

  openRegisterPage() {
    this.router.navigateByUrl('/Registrarse');
  }

  login() {
    const loginRequest = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://52.232.4.28:9000/auth/login', loginRequest).subscribe(
      response => {
        /*sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('rol', response.roles);*/

        // Guardamos el token en las cookies HttpOnly
        document.cookie = `token=${response.token}; path=/; HttpOnly`;
        
        // Decodificamos el token para obtener el rol y el id
        const tokenPayload = JSON.parse(atob(response.token.split('.')[1]));
        const userId = tokenPayload.sub;
        const userRol = tokenPayload.roles;

        // Guardamos el rol y el id en cookies HttpOnly
        /*document.cookie = `rol=${userRol}; path=/; HttpOnly`;
        document.cookie = `id=${userId}; path=/; HttpOnly`;*/        
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('rol', userRol);
        sessionStorage.setItem('id', userId);

        // Redirigimos a la página principal
        this.router.navigateByUrl('/Perfil').then(() => {window.location.reload();});
        
      },
      error => {
        console.error('Error durante el incio de sesión', error);
      }
    );
  }
}
