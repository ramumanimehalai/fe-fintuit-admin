import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSettingComponent } from './channel-setting.component';

describe('ChannelSettingComponent', () => {
  let component: ChannelSettingComponent;
  let fixture: ComponentFixture<ChannelSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
