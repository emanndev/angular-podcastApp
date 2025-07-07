import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Playlist,
  PlaylistForm,
  Episode,
  ApiResponse,
} from '../../model/podcast.models';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllPlaylists(): Observable<Playlist[]> {
    return this.http
      .get<ApiResponse<Playlist[]>>(`${this.baseUrl}/playlists`)
      .pipe(map((res) => res.data));
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
      .pipe(map((res) => res.data));
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
