import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BungalowUpdateModalComponent } from './bungalow-update-modal.component';

describe('BungalowUpdateModalComponent', () => {
  let component: BungalowUpdateModalComponent;
  let fixture: ComponentFixture<BungalowUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BungalowUpdateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BungalowUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
