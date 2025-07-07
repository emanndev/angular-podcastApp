import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamMember, ApiResponse } from '../../model/podcast.models';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MOCK_TEAM_MEMBERS } from '../../shared/mock-data';

@Injectable({ providedIn: 'root' })
export class TeamMembersService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllTeam(): Observable<TeamMember[]> {
    return this.http
      .get<ApiResponse<TeamMember[]>>(`${this.baseUrl}/team`)
      .pipe(
        map((res) => res.data),
        catchError((err) => {
          console.warn('⚠️ API failed, using mock team data', err);
          return of(MOCK_TEAM_MEMBERS);
        })
      );
  }

  deleteTeamMember(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/team/${id}`);
  }

  getAll(): Observable<TeamMember[]> {
    return this.http
      .get<ApiResponse<TeamMember[]>>(`${this.baseUrl}/team`)
      .pipe(
        map((res) => res.data),
        catchError(() => of([]))
      );
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

  //handle logic for edit team memeber component
  getTeamMemberById(id: number): Observable<TeamMember> {
    return this.http
      .get<ApiResponse<TeamMember>>(`${this.baseUrl}/team/${id}`)
      .pipe(map((res) => res.data));
  }

  updateTeamMember(
    id: number,
    data: Partial<TeamMember>
  ): Observable<TeamMember> {
    return this.http
      .put<ApiResponse<TeamMember>>(`${this.baseUrl}/team/${id}`, data)
      .pipe(map((res) => res.data));
  }
}
