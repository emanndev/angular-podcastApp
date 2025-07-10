import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/utils/components/toast/toast.component';
import { AudioPlayerBarComponent } from './shared/components/audio-player-bar/audio-player-bar.component';
import { AudioPlayerService } from './core/services/audio-player.service';
import { AudioPlayerConfig } from './model/podcast.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, AudioPlayerBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showAudioPlayer = false;
  config: AudioPlayerConfig | null = null;

  constructor(private audioService: AudioPlayerService) {
    this.audioService.visible$.subscribe((visible) => {
      this.showAudioPlayer = visible;
    });

    this.audioService.config$.subscribe((config) => {
      this.config = config;
    });
  }
}
