import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNodeEmptyComponent } from './card-node-empty.component';

describe('CardNodeEmptyComponent', () => {
  let component: CardNodeEmptyComponent;
  let fixture: ComponentFixture<CardNodeEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNodeEmptyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNodeEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
