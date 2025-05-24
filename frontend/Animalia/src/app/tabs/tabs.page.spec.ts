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
    ]);
  });

  it('should set tabs based on USER rol', () => {
    spyOn(component, 'getUserRolFromToken').and.returnValue('USER');
    component.ngOnInit();
    expect(component.tabs).toEqual([
      { title: 'animales', route: '/animales' },
    ]);
  });

  it('should set tabs based on EMPRESA rol', () => {
    spyOn(component, 'getUserRolFromToken').and.returnValue('EMPRESA');
    component.ngOnInit();
    expect(component.tabs).toEqual([
      { title: 'Camara', route: '/Camara' },
    ]);
  });

  it('should set default tabs when rol is null', () => {
    spyOn(component, 'getUserRolFromToken').and.returnValue(null);
    component.ngOnInit();
    expect(component.tabs).toEqual([
      { title: 'animales', route: '/animales' },
    ]);
  });
  
});