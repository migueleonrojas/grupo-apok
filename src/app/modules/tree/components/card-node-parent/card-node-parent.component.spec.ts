import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNodeParentComponent } from './card-node-parent.component';

describe('CardNodeParentComponent', () => {
  let component: CardNodeParentComponent;
  let fixture: ComponentFixture<CardNodeParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNodeParentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNodeParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
