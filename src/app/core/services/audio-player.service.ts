import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AudioPlayerConfig } from '../../model/podcast.models';

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {
  private configSubject = new BehaviorSubject<AudioPlayerConfig | null>(null);
  private visibleSubject = new BehaviorSubject<boolean>(false);

  config$ = this.configSubject.asObservable();
  visible$ = this.visibleSubject.asObservable();

  play(config: AudioPlayerConfig): void {
    this.configSubject.next(config);
    this.visibleSubject.next(true);
  }

  close(): void {
    this.visibleSubject.next(false);
  }
}
