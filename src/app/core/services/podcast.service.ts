import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Episode, Podcast } from '../../model/podcast.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PodcastService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 🔹 Get latest episodes
  getLatestEpisodes(limit: number): Observable<Episode[]> {
    return this.http
      .get<{ data: any[] }>(`${this.apiUrl}/episodes?limit=${limit}`)
      .pipe(
        map((response) =>
          response.data.map((episode) => this.transformToEpisode(episode))
        )
      );
  }

  // 🔹 Search episodes
  searchEpisodes(query: string): Observable<Episode[]> {
    return this.http
      .get<{ data: any[] }>(`${this.apiUrl}/episodes/search?query=${query}`)
      .pipe(
        map((response) =>
          response.data.map((episode) => this.transformToEpisode(episode))
        )
      );
  }

  // 🔹 Get all podcasts
  getAllPodcasts(): Observable<Podcast[]> {
    return this.http.get<Podcast[]>(`${this.apiUrl}/podcasts`);
  }

  // 🔹 Get episode by ID
  getEpisodeById(id: number): Observable<Episode> {
    return this.http
      .get<any>(`${this.apiUrl}/episodes/${id}`)
      .pipe(map(this.transformToEpisode));
  }

  // 🔹 Get podcast by ID
  getPodcastById(id: number): Observable<Podcast> {
    return this.http.get<Podcast>(`${this.apiUrl}/podcasts/${id}`);
  }

  // 🔁 Helper to format backend response into Episode model
  private transformToEpisode = (episode: any): Episode => ({
    id: episode.id,
    title: episode.title,
    description: episode.description,
  
    img_url: episode.img_url,      // ✅ ensure compatibility if needed elsewhere
    audio_url: episode.audio_url,
    created_at: episode.created_at,
    // updated_at: episode.updated_at || '',
  });
}
