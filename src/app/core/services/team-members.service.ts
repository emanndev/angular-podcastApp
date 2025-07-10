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
      .get<ApiResponse<TeamMember[]>>(`${this.baseUrl}/team-members`)
      .pipe(
        map((res) =>
          res.data.map((member: any) => ({
            id: member.id,
            name: member.name,
            role: member.role,
            bio: member.bio,
            profile_image: member.profile_image,
            social_media: member.social_media_links || [],
          }))
        ),
        catchError((err) => {
          console.warn('⚠️ API failed, using mock team data', err);

          const mapped = MOCK_TEAM_MEMBERS.map((member: any) => ({
            id: member.id,
            name: member.name,
            role: member.role,
            bio: member.bio,
            profile_image: member.image,
            social_media: member.socialMedia,
          }));
          return of(mapped);
        })
      );
  }

  deleteTeamMember(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/team-members/${id}`);
  }

  create(member: Partial<TeamMember>): Observable<TeamMember> {
    return this.http
      .post<ApiResponse<TeamMember>>(`${this.baseUrl}/team-members`, member)
      .pipe(map((res) => res.data));
  }

  getTeamMemberById(id: number): Observable<TeamMember> {
    return this.http
      .get<ApiResponse<TeamMember>>(`${this.baseUrl}/team-members/${id}`)
      .pipe(map((res) => res.data));
  }

  updateTeamMember(
    id: number,
    data: Partial<TeamMember>
  ): Observable<TeamMember> {
    return this.http
      .put<ApiResponse<TeamMember>>(`${this.baseUrl}/team-members/${id}`, data)
      .pipe(map((res) => res.data));
  }
}
