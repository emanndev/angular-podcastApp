import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Episode } from '../../../model/podcast.models';

@Component({
  selector: 'app-audio-player-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player-bar.component.html',
  styleUrls: ['./audio-player-bar.component.scss']
})
export class AudioPlayerBarComponent {
  @Input() currentEpisode!: Episode;
  isPlaying = false;

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    const audio = document.getElementById('main-audio') as HTMLAudioElement;
    this.isPlaying ? audio.play() : audio.pause();
  }
}
