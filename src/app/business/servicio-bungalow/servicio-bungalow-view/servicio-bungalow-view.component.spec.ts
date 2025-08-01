import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioBungalowViewComponent } from './servicio-bungalow-view.component';

describe('ServicioBungalowViewComponent', () => {
  let component: ServicioBungalowViewComponent;
  let fixture: ComponentFixture<ServicioBungalowViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioBungalowViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioBungalowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
