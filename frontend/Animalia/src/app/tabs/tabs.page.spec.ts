import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsPage } from './tabs.page';

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set tabs based on ADMIN rol', () => {
    spyOn(component, 'getUserRolFromToken').and.returnValue('ADMIN');
    component.ngOnInit();
    expect(component.tabs).toEqual([
      { title: 'animales', route: '/animales' },
      { title: 'Camara', route: '/Camara' },
      // otros tabs para admin
    ]);
  });

  it('should set tabs based on USER rol', () => {
    spyOn(component, 'getUserRolFromToken').and.returnValue('USER');
    component.ngOnInit();
    expect(component.tabs).toEqual([
      { title: 'animales', route: '/animales' },
      // otros tabs para usuarios normales
    ]);
  });

  it('should set tabs based on EMPRESA rol', () => {
    spyOn(component, 'getUserRolFromToken').and.returnValue('EMPRESA');
    component.ngOnInit();
    expect(component.tabs).toEqual([
      { title: 'Camara', route: '/Camara' },
      // otros tabs para usuarios de empresa
    ]);
  });

  it('should set default tabs when rol is null', () => {
    spyOn(component, 'getUserRolFromToken').and.returnValue(null);
    component.ngOnInit();
    expect(component.tabs).toEqual([
      { title: 'animales', route: '/animales' },
      // otros tabs para usuarios normales
    ]);
  });

  /*it('should set tabs based on ADMIN role', () => {
    document.cookie = 'rol=ADMIN'; // Simular la cookie de rol
    component.ngOnInit();
    expect(component.tabs).toEqual([
      { title: 'Animales', route: '/animales' },
      { title: 'Cámara', route: '/camara' },
      // Otros tabs específicos para admin
    ]);
  });
  
  it('should set tabs based on USER role', () => {
    document.cookie = 'rol=USER'; // Simular la cookie de rol
    component.ngOnInit();
    expect(component.tabs).toEqual([
      { title: 'Animales', route: '/animales' },
      // Otros tabs para usuarios normales
    ]);
  });
  
  it('should set tabs based on EMPRESA role', () => {
    document.cookie = 'rol=EMPRESA'; // Simular la cookie de rol
    component.ngOnInit();
    expect(component.tabs).toEqual([
      { title: 'Cámara', route: '/camara' },
      // Otros tabs para empresa
    ]);
  });*/
  
});