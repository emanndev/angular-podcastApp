import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Episode, ApiResponse } from '../../model/podcast.models';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEpisodes(): Observable<Episode[]> {
    return this.http
      .get<ApiResponse<Episode[]>>(`${this.baseUrl}/episodes`)
      .pipe(map((res) => res.data));
  }

  getEpisodeById(id: number): Observable<Episode> {
    return this.http
      .get<ApiResponse<Episode>>(`${this.baseUrl}/episodes/${id}`)
      .pipe(map((res) => res.data));
  }

  createEpisode(data: Partial<Episode>): Observable<any> {
    return this.http.post(`${this.baseUrl}/episodes`, data);
  }

  updateEpisode(id: number, data: Partial<Episode>): Observable<any> {
    return this.http.put(`${this.baseUrl}/episodes/${id}`, data);
  }

  deleteEpisode(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/episodes/${id}`);
  }
}
