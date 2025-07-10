import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMembersService } from '../../core/services/team-members.service';
import { TeamMember } from '../../model/podcast.models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TeamMemberDialogComponent } from '../team/team-member-dialog/team-member-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../shared/utils/services/toast.service';

@Component({
  selector: 'app-admin-team',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.scss'],
})
export class AdminTeamComponent implements OnInit {
  team: TeamMember[] = [];
  loading = true;

  constructor(
    private teamService: TeamMembersService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadTeam();
  }

  loadTeam() {
    this.teamService.getAllTeam().subscribe({
      next: (res) => {
        this.team = res;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(TeamMemberDialogComponent, {
      width: '600px',
      data: null,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.teamService.create(result).subscribe(() => {
          this.toast.show('Team member added!', 'success');
          this.loadTeam();
        });
      }
    });
  }

  openEditDialog(member: TeamMember) {
    const dialogRef = this.dialog.open(TeamMemberDialogComponent, {
      width: '600px',
      data: member,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.teamService.update(member.id, result).subscribe(() => {
          this.toast.show('Team member updated!', 'success');
          this.loadTeam();
        });
      }
    });
  }

  deleteMember(id: number) {
    if (confirm('Delete this member?')) {
      this.teamService.deleteTeamMember(id).subscribe(() => {
        this.toast.show('Deleted successfully', 'success');
        this.loadTeam();
      });
    }
  }

  getSocialIcon(platform: string): string {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return 'facebook.svg';
      case 'twitter':
      case 'x':
        return 'x.svg';
      case 'instagram':
        return 'instagram.svg';
      case 'linkedin':
        return 'linkedin.svg';
      default:
        return 'link.svg';
    }
  }
}
