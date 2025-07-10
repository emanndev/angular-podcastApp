import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerService } from '../../../core/services/audio-player.service';
import { AudioPlayerConfig } from '../../../model/podcast.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audio-player-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player-bar.component.html',
  styleUrls: ['./audio-player-bar.component.scss'],
})
export class AudioPlayerBarComponent implements OnInit, OnDestroy {
  @ViewChild('audioElement', { static: false })
  audioElement!: ElementRef<HTMLAudioElement>;

  config!: AudioPlayerConfig;
  isVisible = false;

  isPlaying = false;
  isLoaded = false;
  isMuted = false;
  showVolumeSlider = false;
  currentTime = 0;
  duration = 0;
  progress = 0;
  volume = 1;
  playbackRate = 1;
  isMobileExpanded = false;

  private playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
  private currentRateIndex = 2;
  private subscriptions: Subscription[] = [];

  constructor(
    private audioService: AudioPlayerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Subscribe to config changes
    this.subscriptions.push(
      this.audioService.config$.subscribe((config) => {
        if (config) {
          this.config = config;
          this.isLoaded = false;
          this.currentTime = 0;
          this.duration = 0;
          this.progress = 0;
          this.isPlaying = false;

          // Wait for next tick to ensure audio element is available
          setTimeout(() => {
            if (this.audioElement?.nativeElement && config.autoplay) {
              this.audioElement.nativeElement.play().catch((error) => {
                console.error('Error playing audio:', error);
              });
            }
          }, 0);

          this.cdr.detectChanges();
        }
      })
    );

    // Subscribe to visibility changes
    this.subscriptions.push(
      this.audioService.visible$.subscribe((visible) => {
        this.isVisible = visible;
        if (!visible) {
          this.pauseAudio();
        }
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.pauseAudio();
  }

  private pauseAudio() {
    if (this.audioElement?.nativeElement) {
      this.audioElement.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  toggleMobilePlayer() {
    this.isMobileExpanded = !this.isMobileExpanded;
  }

  closePlayer() {
    this.audioService.close();
    this.pauseAudio();
  }

  onLoadedMetadata() {
    if (this.audioElement?.nativeElement) {
      this.duration = this.audioElement.nativeElement.duration;
      this.isLoaded = true;
      this.cdr.detectChanges();
    }
  }

  onTimeUpdate() {
    if (this.audioElement?.nativeElement) {
      const audio = this.audioElement.nativeElement;
      this.currentTime = audio.currentTime;
      this.progress = (this.currentTime / this.duration) * 100;
      this.cdr.detectChanges();
    }
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

  togglePlay() {
    if (this.audioElement?.nativeElement) {
      const audio = this.audioElement.nativeElement;
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
    }
  }

  skipBackward() {
    if (this.audioElement?.nativeElement) {
      const audio = this.audioElement.nativeElement;
      audio.currentTime = Math.max(0, audio.currentTime - 15);
    }
  }

  skipForward() {
    if (this.audioElement?.nativeElement) {
      const audio = this.audioElement.nativeElement;
      audio.currentTime = Math.min(this.duration, audio.currentTime + 15);
    }
  }

  seekTo(event: MouseEvent) {
    if (this.audioElement?.nativeElement) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const percent = (event.clientX - rect.left) / rect.width;
      this.audioElement.nativeElement.currentTime = percent * this.duration;
    }
  }

  toggleMute() {
    if (this.audioElement?.nativeElement) {
      const audio = this.audioElement.nativeElement;
      this.isMuted = !this.isMuted;
      audio.muted = this.isMuted;
      this.showVolumeSlider = !this.showVolumeSlider;
    }
  }

  onVolumeChange(event: Event) {
    if (this.audioElement?.nativeElement) {
      const input = event.target as HTMLInputElement;
      this.volume = parseFloat(input.value);
      this.audioElement.nativeElement.volume = this.volume;
      this.isMuted = this.volume === 0;
    }
  }

  toggleSpeed() {
    if (this.audioElement?.nativeElement) {
      this.currentRateIndex =
        (this.currentRateIndex + 1) % this.playbackRates.length;
      this.playbackRate = this.playbackRates[this.currentRateIndex];
      this.audioElement.nativeElement.playbackRate = this.playbackRate;
    }
  }

  downloadAudio() {
    if (this.config?.src) {
      const link = document.createElement('a');
      link.href = this.config.src;
      link.download = this.config.title || 'audio';
      link.click();
    }
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) return '0:00';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-cover.jpg';
  }
}
