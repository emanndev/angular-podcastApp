import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Confession } from '../../model/podcast.models';
import { ApiResponse } from '../../model/podcast.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfessionsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllConfessions(): Observable<Confession[]> {
    return this.http
      .get<ApiResponse<Confession[]>>(`${this.baseUrl}/confessions`)
      .pipe(map((res) => res.data));
  }
  approveConfession(id: number): Observable<Confession> {
    return this.http.put<Confession>(
      `${this.baseUrl}/confessions/${id}/approve`,
      {}
    );
  }
  submitConfession(data: Partial<Confession>): Observable<Confession> {
    return this.http.post<Confession>(`${this.baseUrl}/confessions`, data);
  }
}
