import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesEmpresaPage } from './detalles-empresa.page';

describe('DetallesEmpresaPage', () => {
  let component: DetallesEmpresaPage;
  let fixture: ComponentFixture<DetallesEmpresaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesEmpresaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
