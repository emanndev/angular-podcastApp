import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Podcast } from '../../model/podcast.models';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {
  private podcasts: Podcast[] = [
    {
      id: 1,
      title: 'Life Talks with Mabel',
      description: 'Real stories, real people, real inspiration.',
      image: 'assets/images/podcast-1.jpg',
      tags: ['Life', 'Motivation'],
      created_at: '2025-07-01',
      episodes: [
        {
          id: 101,
          title: 'Start Where You Are',
          description: 'Let’s talk about the power of small beginnings.',
          audio_url: 'assets/audio/start-where-you-are.mp3',
          created_at: '2025-07-02'
        },
        {
          id: 102,
          title: 'Balance in Chaos',
          description: 'How to stay grounded in a fast world.',
          audio_url: 'assets/audio/balance.mp3',
          created_at: '2025-07-03'
        }
      ]
    },
    {
      id: 2,
      title: 'Tech Vibes',
      description: 'Weekly dive into the hottest in tech and gadgets.',
      image: 'assets/images/podcast-2.jpg',
      tags: ['Tech', 'News'],
      created_at: '2025-06-20',
      episodes: [
        {
          id: 201,
          title: 'AI in 2025',
          description: 'Where are we and what’s next?',
          audio_url: 'assets/audio/ai-2025.mp3',
          created_at: '2025-06-21'
        }
      ]
    }
  ];

  getAll(): Observable<Podcast[]> {
    return of(this.podcasts);
  }

  getById(id: number): Observable<Podcast | undefined> {
    const podcast = this.podcasts.find(p => p.id === id);
    return of(podcast);
  }
}
