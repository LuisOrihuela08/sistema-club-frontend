import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospedajeUpdateModalComponent } from './hospedaje-update-modal.component';

describe('HospedajeUpdateModalComponent', () => {
  let component: HospedajeUpdateModalComponent;
  let fixture: ComponentFixture<HospedajeUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospedajeUpdateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospedajeUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
