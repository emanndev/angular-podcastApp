import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayerBarComponent } from './audio-player-bar.component';

describe('AudioPlayerBarComponent', () => {
  let component: AudioPlayerBarComponent;
  let fixture: ComponentFixture<AudioPlayerBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioPlayerBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioPlayerBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
