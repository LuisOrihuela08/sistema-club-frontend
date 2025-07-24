import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioBungalowComponent } from './servicio-bungalow.component';

describe('ServicioBungalowComponent', () => {
  let component: ServicioBungalowComponent;
  let fixture: ComponentFixture<ServicioBungalowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioBungalowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioBungalowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
