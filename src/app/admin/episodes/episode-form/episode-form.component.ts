import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EpisodeService } from '../../../core/services/episode.service';
import { ToastService } from '../../../shared/utils/services/toast.service';

@Component({
  selector: 'app-episode-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './episode-form.component.html',
  styleUrl: './episode-form.component.scss',
})
export class EpisodeFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  episodeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private episodeService: EpisodeService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      audio_url: ['', Validators.required],
    });

    this.episodeId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.episodeId;

    if (this.isEdit) {
      this.episodeService.getEpisodeById(this.episodeId).subscribe((ep) => {
        this.form.patchValue(ep);
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const episodeData = this.form.value;

    if (this.isEdit) {
      this.episodeService
        .updateEpisode(this.episodeId!, episodeData)
        .subscribe(() => {
          this.toast.show('Episode updated!', 'success');
          this.router.navigate(['/admin/episodes']);
        });
    } else {
      this.episodeService.createEpisode(episodeData).subscribe(() => {
        this.toast.show('Episode created!', 'success');
        this.router.navigate(['/admin/episodes']);
      });
    }
  }
}
