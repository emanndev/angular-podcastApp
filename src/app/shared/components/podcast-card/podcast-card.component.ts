import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Podcast } from '../../../model/podcast.models';

@Component({
  selector: 'app-podcast-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './podcast-card.component.html',
  styleUrls: ['./podcast-card.component.scss']
})
export class PodcastCardComponent {
  @Input() podcast!: Podcast;
}
