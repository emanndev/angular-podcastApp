import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Playlist,
  PlaylistForm,
  Episode,
  ApiResponse,
} from '../../model/podcast.models';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MOCK_PLAYLISTS } from '../../shared/mock-data';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllPlaylists(): Observable<Playlist[]> {
    return this.http
      .get<ApiResponse<Playlist[]>>(`${this.baseUrl}/playlists`)
      .pipe(
        map((res) => {
          if (res.data.length === 0) {
            console.warn(' API returned empty playlists. Using mock data...');
            return MOCK_PLAYLISTS;
          }
          return res.data;
        }),
        catchError((error) => {
          console.warn(' API failed, using mock playlists:', error);
          return of(MOCK_PLAYLISTS);
        })
      );
  }
  getAllEpisodes(): Observable<Episode[]> {
    return this.http
      .get<ApiResponse<Episode[]>>(`${this.baseUrl}/episodes`)
      .pipe(map((res) => res.data));
  }

  createPlaylist(data: PlaylistForm): Observable<Playlist> {
    return this.http
      .post<ApiResponse<Playlist>>(`${this.baseUrl}/playlists`, data)
      .pipe(map((res) => res.data));
  }

  getPlaylistById(id: number): Observable<Playlist> {
    return this.http
      .get<ApiResponse<Playlist>>(`${this.baseUrl}/playlists/${id}`)
      .pipe(
        map((res) => res.data),
        catchError(() => {
          const fallback = MOCK_PLAYLISTS.find((p) => p.id === id);
          return of(fallback!);
        })
      );
  }

  updatePlaylist(id: number, data: PlaylistForm): Observable<Playlist> {
    return this.http
      .put<ApiResponse<Playlist>>(`${this.baseUrl}/playlists/${id}`, data)
      .pipe(map((res) => res.data));
  }

  deletePlaylist(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/playlists/${id}`);
  }
}
