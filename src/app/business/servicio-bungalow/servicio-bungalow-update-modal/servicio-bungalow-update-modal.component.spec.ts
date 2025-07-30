import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioBungalowUpdateModalComponent } from './servicio-bungalow-update-modal.component';

describe('ServicioBungalowUpdateModalComponent', () => {
  let component: ServicioBungalowUpdateModalComponent;
  let fixture: ComponentFixture<ServicioBungalowUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioBungalowUpdateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioBungalowUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
