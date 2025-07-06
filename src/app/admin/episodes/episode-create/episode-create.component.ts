import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episode-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './episode-create.component.html',
  styleUrls: ['./episode-create.component.scss'],
})
export class EpisodeCreateComponent {
  episodeForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.episodeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      audio_url: [
        '',
        [Validators.required, Validators.pattern(/^https?:\/\/.+/)],
      ],
    });
  }

  onSubmit(): void {
    if (this.episodeForm.invalid) return;
    console.log('New Episode:', this.episodeForm.value);

    // TODO: Save to backend or local array
    alert('Episode created successfully!');
    this.router.navigate(['/admin/episodes']);
  }
}
