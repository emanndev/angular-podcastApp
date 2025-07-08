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
      .get<{ data: { data: Playlist[] } }>(`${this.baseUrl}/playlists`)
      .pipe(
        map((res) => {
          const playlists = res.data?.data || [];
          if (playlists.length === 0) {
            console.warn('API returned empty playlists. Using mock data...');
            return MOCK_PLAYLISTS;
          }
          // Ensure each playlist has an episodes array
          return playlists.map((playlist) => ({
            ...playlist,
            episodes: playlist.episodes || [],
          }));
        }),
        catchError((error) => {
          console.warn('API failed, using mock playlists:', error);
          return of(MOCK_PLAYLISTS);
        })
      );
  }

  getAllEpisodes(): Observable<Episode[]> {
    return this.http
      .get<ApiResponse<Episode[]>>(`${this.baseUrl}/episodes`)
      .pipe(
        map((res) => res.data || []),
        catchError((error) => {
          console.error('Failed to load episodes:', error);
          return of([]);
        })
      );
  }

  createPlaylist(data: PlaylistForm): Observable<Playlist> {
    return this.http
      .post<ApiResponse<Playlist>>(`${this.baseUrl}/playlists`, data)
      .pipe(
        map((res) => ({
          ...res.data,
          episodes: res.data.episodes || [],
        })),
        catchError((error) => {
          console.error('Failed to create playlist:', error);
          throw error;
        })
      );
  }

  getPlaylistById(id: number): Observable<Playlist> {
    return this.http
      .get<ApiResponse<Playlist>>(`${this.baseUrl}/playlists/${id}`)
      .pipe(
        map((res) => ({
          ...res.data,
          episodes: res.data.episodes || [],
        })),
        catchError((error) => {
          console.error('Failed to get playlist by ID:', error);
          const fallback = MOCK_PLAYLISTS.find((p) => p.id === id);
          return of(fallback || ({} as Playlist));
        })
      );
  }

  updatePlaylist(id: number, data: PlaylistForm): Observable<Playlist> {
    return this.http
      .put<ApiResponse<Playlist>>(`${this.baseUrl}/playlists/${id}`, data)
      .pipe(
        map((res) => ({
          ...res.data,
          episodes: res.data.episodes || [],
        })),
        catchError((error) => {
          console.error('Failed to update playlist:', error);
          throw error;
        })
      );
  }

  deletePlaylist(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/playlists/${id}`).pipe(
      catchError((error) => {
        console.error('Failed to delete playlist:', error);
        throw error;
      })
    );
  }
}
