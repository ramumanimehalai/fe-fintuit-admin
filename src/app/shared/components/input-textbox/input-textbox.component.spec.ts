import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextboxComponent } from './input-textbox.component';

describe('InputTextboxComponent', () => {
  let component: InputTextboxComponent;
  let fixture: ComponentFixture<InputTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
