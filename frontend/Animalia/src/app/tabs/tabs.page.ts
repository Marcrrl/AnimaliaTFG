import { Component, OnInit } from '@angular/core';
import { get } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {
  public tabs: any[] = [];
  public token: string | null = null;
  public userRol: string | null = null;

  constructor() {}

  ngOnInit() {
    this.userRol = sessionStorage.getItem('rol');
    this.setTabsBasedOnRol(this.userRol);
  }

  ionViewDidEnter() {
    this.ngOnInit();
    this.getCookie('token');
  }

  getCookie(rol: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${rol}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  getUserRolFromToken(): string | null {
    const token = this.getCookie('token');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.roles || null;
    }
    return null;
  }

  setTabsBasedOnRol(rol = sessionStorage.getItem('rol')) {
    if (rol === 'ADMIN') {
      this.tabs = [
        { title: 'Animales', route: '/Animales' },
        { title: 'Camara', route: '/Camara' },
      ];
    } else if (rol === 'USER') {
      this.tabs = [
        { title: 'Animales', route: '/Animales' },
      ];
    } else if (rol === 'EMPRESA') {
      this.tabs = [
        { title: 'Camara', route: '/Camara' },
      ];
    } else {
      this.tabs = [
        { title: 'Animales', route: '/Animales' },
        { title: 'Inicio', route: '/Inicio' },
      ];
    }
  }
}
