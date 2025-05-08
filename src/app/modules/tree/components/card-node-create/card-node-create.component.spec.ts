import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNodeCreateComponent } from './card-node-create.component';

describe('CardNodeCreateComponent', () => {
  let component: CardNodeCreateComponent;
  let fixture: ComponentFixture<CardNodeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNodeCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
