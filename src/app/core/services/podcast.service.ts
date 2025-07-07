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
      image: 'https://via.placeholder.com/300x200?text=Podcast+1',
      tags: ['Life', 'Motivation'],
      created_at: '2025-07-01',
      episodes: []
    },
    {
      id: 2,
      title: 'Tech Vibes',
      description: 'Weekly dive into tech and gadgets.',
      image: 'https://via.placeholder.com/300x200?text=Podcast+2',
      tags: ['Tech', 'News'],
      created_at: '2025-06-20',
      episodes: []
    },
    {
      id: 3,
      title: 'HealthCast',
      description: 'Tips on living a healthy lifestyle.',
      image: 'https://via.placeholder.com/300x200?text=Podcast+3',
      tags: ['Health', 'Wellness'],
      created_at: '2025-06-15',
      episodes: []
    },
    {
      id: 4,
      title: 'Money Talks',
      description: 'Personal finance made simple.',
      image: 'https://via.placeholder.com/300x200?text=Podcast+4',
      tags: ['Finance', 'Money'],
      created_at: '2025-06-10',
      episodes: []
    },
    {
      id: 5,
      title: 'Bold Women Voices',
      description: 'Women leading change in Africa.',
      image: 'https://via.placeholder.com/300x200?text=Podcast+5',
      tags: ['Women', 'Leadership'],
      created_at: '2025-06-05',
      episodes: []
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
