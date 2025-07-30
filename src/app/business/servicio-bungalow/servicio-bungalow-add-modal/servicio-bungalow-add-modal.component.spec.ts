import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioBungalowAddModalComponent } from './servicio-bungalow-add-modal.component';

describe('ServicioBungalowAddModalComponent', () => {
  let component: ServicioBungalowAddModalComponent;
  let fixture: ComponentFixture<ServicioBungalowAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioBungalowAddModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioBungalowAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
