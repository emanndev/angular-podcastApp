import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  updateEpisode(id: number, data: Partial<Episode>): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    console.log('Sending PUT request with token:', token);

    return this.http.put(`${this.baseUrl}/episodes/${id}`, data, { headers });
  }

  deleteEpisode(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/episodes/${id}`);
  }
}
