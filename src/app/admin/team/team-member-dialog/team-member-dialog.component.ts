import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-team-member-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './team-member-dialog.component.html',
  styleUrls: ['./team-member-dialog.component.scss'],
})
export class TeamMemberDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TeamMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      image: [this.data?.image || '', Validators.required],
      bio: [this.data?.bio || '', Validators.required],
      facebook: [this.data?.facebook || ''],
      twitter: [this.data?.twitter || ''],
      instagram: [this.data?.instagram || ''],
      linkedin: [this.data?.linkedin || ''],
    });
  }

  cancel() {
    this.dialogRef.close();
  }

 submit() {
  if (this.form.valid) {
    const formValues = this.form.value;

    const social_media_links = [
      { platform: 'Facebook', url: formValues.facebook },
      { platform: 'Twitter', url: formValues.twitter },
      { platform: 'Instagram', url: formValues.instagram },
      { platform: 'LinkedIn', url: formValues.linkedin },
    ].filter(link => link.url); // Remove empty URLs

    const payload = {
      name: formValues.name,
      role: 'Team Member',
      bio: formValues.bio,
      profile_image: formValues.image,
      social_media_links,
    };

    this.dialogRef.close(payload);
  }
}

}
