import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesUpdateModalComponent } from './clientes-update-modal.component';

describe('ClientesUpdateModalComponent', () => {
  let component: ClientesUpdateModalComponent;
  let fixture: ComponentFixture<ClientesUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesUpdateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
