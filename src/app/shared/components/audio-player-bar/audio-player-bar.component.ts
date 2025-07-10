import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerConfig } from '../../../model/podcast.models';

@Component({
  selector: 'app-audio-player-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player-bar.component.html',
  styleUrls: ['./audio-player-bar.component.scss'],
})
export class AudioPlayerBarComponent implements OnInit, OnDestroy {
  @Input() config!: AudioPlayerConfig;
  @ViewChild('audioElement', { static: true })
  audioElement!: ElementRef<HTMLAudioElement>;
  @Output() close = new EventEmitter<void>();

  isPlaying = false;
  isLoaded = false;
  isMuted = false;
  showVolumeSlider = false;
  currentTime = 0;
  duration = 0;
  progress = 0;
  volume = 1;
  playbackRate = 1;

  private playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
  private currentRateIndex = 2;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.config) {
      console.error('AudioPlayerComponent: config is required');
      return;
    }

    this.setupAudioElement();
  }

  ngOnDestroy() {
    if (this.audioElement?.nativeElement) {
      this.audioElement.nativeElement.pause();
    }
  }

  closePlayer() {
    this.close.emit();
  }
  private setupAudioElement() {
    const audio = this.audioElement.nativeElement;
    audio.volume = this.volume;
    audio.playbackRate = this.playbackRate;
  }

  onLoadedMetadata() {
    this.duration = this.audioElement.nativeElement.duration;
    this.isLoaded = true;
    this.cdr.detectChanges();
  }

  onTimeUpdate() {
    const audio = this.audioElement.nativeElement;
    this.currentTime = audio.currentTime;
    this.progress = (this.currentTime / this.duration) * 100;
    this.cdr.detectChanges();
  }

  onPlay() {
    this.isPlaying = true;
    this.cdr.detectChanges();
  }

  onPause() {
    this.isPlaying = false;
    this.cdr.detectChanges();
  }

  onEnded() {
    this.isPlaying = false;
    this.progress = 0;
    this.currentTime = 0;
    this.cdr.detectChanges();
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src =
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iNDAiIGZpbGw9IiNmMGYwZjAiLz4KPHN2ZyB4PSIyNCIgeT0iMjQiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5OTk5OTkiIHN0cm9rZS13aWR0aD0iMiI+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiLz4KPHN0cm9rZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz4KPC9zdmc+Cjwvc3ZnPgo=';
  }

  togglePlay() {
    const audio = this.audioElement.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  }

  seekTo(event: MouseEvent) {
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const newTime = percent * this.duration;

    this.audioElement.nativeElement.currentTime = newTime;
  }

  skipBackward() {
    const audio = this.audioElement.nativeElement;
    audio.currentTime = Math.max(0, audio.currentTime - 15);
  }

  skipForward() {
    const audio = this.audioElement.nativeElement;
    audio.currentTime = Math.min(this.duration, audio.currentTime + 15);
  }

  toggleMute() {
    const audio = this.audioElement.nativeElement;
    this.isMuted = !this.isMuted;
    audio.muted = this.isMuted;
    this.showVolumeSlider = !this.showVolumeSlider;
  }

  onVolumeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume = parseFloat(input.value);
    this.audioElement.nativeElement.volume = this.volume;
    this.isMuted = this.volume === 0;
  }

  toggleSpeed() {
    this.currentRateIndex =
      (this.currentRateIndex + 1) % this.playbackRates.length;
    this.playbackRate = this.playbackRates[this.currentRateIndex];
    this.audioElement.nativeElement.playbackRate = this.playbackRate;
  }

  downloadAudio() {
    const link = document.createElement('a');
    link.href = this.config.src;
    link.download = this.config.title || 'audio';
    link.click();
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
