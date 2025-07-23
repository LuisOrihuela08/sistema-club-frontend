import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodopagoAddModalComponent } from './metodopago-add-modal.component';

describe('MetodopagoAddModalComponent', () => {
  let component: MetodopagoAddModalComponent;
  let fixture: ComponentFixture<MetodopagoAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodopagoAddModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodopagoAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
