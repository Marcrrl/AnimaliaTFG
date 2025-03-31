import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignFormPage } from './sign-form.page';

describe('SignFormPage', () => {
  let component: SignFormPage;
  let fixture: ComponentFixture<SignFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
