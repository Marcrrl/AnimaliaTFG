import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RescatesPage } from './rescates.page';

describe('RescatesPage', () => {
  let component: RescatesPage;
  let fixture: ComponentFixture<RescatesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RescatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
