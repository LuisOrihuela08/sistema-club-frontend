import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodopagoUpdateModalComponent } from './metodopago-update-modal.component';

describe('MetodopagoUpdateModalComponent', () => {
  let component: MetodopagoUpdateModalComponent;
  let fixture: ComponentFixture<MetodopagoUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodopagoUpdateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodopagoUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
