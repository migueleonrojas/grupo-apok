import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNodeComponent } from './card-node.component';

describe('CardNodeComponent', () => {
  let component: CardNodeComponent;
  let fixture: ComponentFixture<CardNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
