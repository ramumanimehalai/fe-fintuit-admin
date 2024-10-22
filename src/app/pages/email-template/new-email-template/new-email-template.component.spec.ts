import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewemailtemplateComponent } from './new-email-template.component';

describe('NewemailtemplateComponent', () => {
  let component: NewemailtemplateComponent;
  let fixture: ComponentFixture<NewemailtemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewemailtemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewemailtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
