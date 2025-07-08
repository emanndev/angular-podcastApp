import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamMember, ApiResponse } from '../../model/podcast.models';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TeamMembersService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TeamMember[]> {
    return this.http
      .get<ApiResponse<TeamMember[]>>(`${this.baseUrl}/team`)
      .pipe(
        map((res) => res.data),
        catchError(() => of([]))
      );
  }

  getAllTeamMembers(): Observable<TeamMember[]> {
    return this.getAll();
  }

  create(member: Partial<TeamMember>): Observable<TeamMember> {
    return this.http
      .post<ApiResponse<TeamMember>>(`${this.baseUrl}/team`, member)
      .pipe(map((res) => res.data));
  }

  update(id: number, member: Partial<TeamMember>): Observable<TeamMember> {
    return this.http
      .put<ApiResponse<TeamMember>>(`${this.baseUrl}/team/${id}`, member)
      .pipe(map((res) => res.data));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/team/${id}`);
  }

  getById(id: number): Observable<TeamMember> {
    return this.http
      .get<ApiResponse<TeamMember>>(`${this.baseUrl}/team/${id}`)
      .pipe(map((res) => res.data));
  }
}
