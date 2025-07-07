import { Component, OnInit } from '@angular/core';
import { TeamMembersService } from '../../core/services/team-members.service';
import { TeamMember } from '../../model/podcast.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.scss'],
})
export class AdminTeamComponent implements OnInit {
  team: TeamMember[] = [];

  constructor(private service: TeamMembersService) {}

  ngOnInit() {
    this.service.getAll().subscribe((res) => (this.team = res));
  }
}
