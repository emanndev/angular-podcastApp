// import { Component, Inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import {
//   MAT_DIALOG_DATA,
//   MatDialogRef,
//   MatDialogModule,
// } from '@angular/material/dialog';
// import { PlaylistService } from '../../../core/services/playlist.service';
// import { Playlist } from '../../../model/podcast.models';
// import { MatSelectModule } from '@angular/material/select';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-playlist-dialog',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatDialogModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatButtonModule,
//   ],
//   templateUrl: './playlist-dialog.component.html',
// })
// export class PlaylistDialogComponent implements OnInit {
//   form!: FormGroup;
//   loading = false;
//   episodes: any[] = [];
//   isEdit = false;

//   constructor(
//     private fb: FormBuilder,
//     private dialogRef: MatDialogRef<PlaylistDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { playlist?: Playlist },
//     private playlistService: PlaylistService
//   ) {}

//   ngOnInit(): void {
//     this.form = this.fb.group({
//       title: [this.data?.playlist?.name || '', Validators.required],
//       description: [this.data?.playlist?.description || ''],
//       episode_ids: [
//         this.data?.playlist?.episodes.map((e) => e.id) || [],
//         Validators.required,
//       ],
//     });

//     this.isEdit = !!this.data?.playlist;

//     this.playlistService.getAllEpisodes().subscribe((episodes) => {
//       this.episodes = episodes;
//     });
//   }

//   onSubmit(): void {
//     if (this.form.invalid) return;

//     this.loading = true;
//     const payload = this.form.value;

//     const request = this.isEdit
//       ? this.playlistService.updatePlaylist(this.data.playlist!.id, payload)
//       : this.playlistService.createPlaylist(payload);

//     request.subscribe({
//       next: (res) => this.dialogRef.close(res),
//       error: () => (this.loading = false),
//     });
//   }

//   cancel(): void {
//     this.dialogRef.close();
//   }
// }
