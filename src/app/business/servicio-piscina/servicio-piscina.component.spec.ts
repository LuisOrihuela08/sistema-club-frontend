import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioPiscinaComponent } from './servicio-piscina.component';

describe('ServicioPiscinaComponent', () => {
  let component: ServicioPiscinaComponent;
  let fixture: ComponentFixture<ServicioPiscinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioPiscinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioPiscinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
