import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospedajeAddModalComponent } from './hospedaje-add-modal.component';

describe('HospedajeAddModalComponent', () => {
  let component: HospedajeAddModalComponent;
  let fixture: ComponentFixture<HospedajeAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospedajeAddModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospedajeAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
