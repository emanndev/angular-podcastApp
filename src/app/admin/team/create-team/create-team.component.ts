import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TeamMembersService } from '../../../core/services/team-members.service';

@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamMembersService,
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
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    this.teamService.create(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/team']);
      },
      error: () => (this.loading = false),
    });
  }
}
