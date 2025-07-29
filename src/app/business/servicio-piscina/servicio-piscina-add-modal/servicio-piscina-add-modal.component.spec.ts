import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioPiscinaAddModalComponent } from './servicio-piscina-add-modal.component';

describe('ServicioPiscinaAddModalComponent', () => {
  let component: ServicioPiscinaAddModalComponent;
  let fixture: ComponentFixture<ServicioPiscinaAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioPiscinaAddModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioPiscinaAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
