import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioPiscinaUpdateModalComponent } from './servicio-piscina-update-modal.component';

describe('ServicioPiscinaUpdateModalComponent', () => {
  let component: ServicioPiscinaUpdateModalComponent;
  let fixture: ComponentFixture<ServicioPiscinaUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioPiscinaUpdateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioPiscinaUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
