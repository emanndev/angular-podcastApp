import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeamMembersService } from '../../../core/services/team-members.service';
import { TeamMember } from '../../../model/podcast.models';

@Component({
  selector: 'app-edit-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-team.component.html',
  styleUrls: ['../create-team/create-team.component.scss'],
})
export class EditTeamComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  memberId!: number;

  constructor(
    private fb: FormBuilder,
    private service: TeamMembersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      bio: [''],
      image: [''],
      facebook: [''],
      twitter: [''],
      instagram: [''],
      linkedin: [''],
    });

    this.memberId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.memberId) {
      this.service.getTeamMemberById(this.memberId).subscribe((member) => {
        this.form.patchValue(member);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;

    this.service.updateTeamMember(this.memberId, this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/team']);
      },
      error: () => (this.loading = false),
    });
  }
}
