import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsNodeComponent } from './parent-nodes.component';

describe('ParentsNodeComponent', () => {
  let component: ParentsNodeComponent;
  let fixture: ComponentFixture<ParentsNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentsNodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParentsNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
