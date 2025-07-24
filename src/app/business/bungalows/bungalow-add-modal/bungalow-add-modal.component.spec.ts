import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BungalowAddModalComponent } from './bungalow-add-modal.component';

describe('BungalowAddModalComponent', () => {
  let component: BungalowAddModalComponent;
  let fixture: ComponentFixture<BungalowAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BungalowAddModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BungalowAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
