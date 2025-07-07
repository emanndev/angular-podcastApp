import { Component, OnInit } from '@angular/core';
import { TeamMembersService } from '../../core/services/team-members.service';
import { TeamMember } from '../../model/podcast.models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-team',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.scss'],
})
export class AdminTeamComponent implements OnInit {
  team: TeamMember[] = [];
  loading = true;

  constructor(private teamService: TeamMembersService) {}

  ngOnInit(): void {
    this.teamService.getAllTeam().subscribe({
      next: (res) => {
        this.team = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  deleteMember(id: number) {
    if (confirm('Are you sure?')) {
      this.teamService.deleteTeamMember(id).subscribe(() => {
        this.team = this.team.filter((m) => m.id !== id);
      });
    }
  }
}
