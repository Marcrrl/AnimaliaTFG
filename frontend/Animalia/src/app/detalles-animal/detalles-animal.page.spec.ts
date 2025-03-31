import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesAnimalPage } from './detalles-animal.page';

describe('DetallesAnimalPage', () => {
  let component: DetallesAnimalPage;
  let fixture: ComponentFixture<DetallesAnimalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
