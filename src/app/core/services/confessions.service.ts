import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Confession } from '../../model/podcast.models';
import { ApiResponse } from '../../model/podcast.models';

@Injectable({
  providedIn: 'root',
})
export class ConfessionsService {
  private baseUrl = 'https://api.rantsnconfess.com/api';

  constructor(private http: HttpClient) {}

  getAllConfessions(): Observable<Confession[]> {
    return this.http
      .get<ApiResponse<Confession[]>>(`${this.baseUrl}/admin/confessions`)
      .pipe(map((res) => res.data));
  }
}
