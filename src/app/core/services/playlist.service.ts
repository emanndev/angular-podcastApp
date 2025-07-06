import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Playlist, ApiResponse } from '../../model/podcast.models';
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
}
