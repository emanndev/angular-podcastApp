import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfessionsService } from '../../core/services/confessions.service';
import { Confession } from '../../model/podcast.models';
import { MOCK_CONFESSIONS } from '../../shared/mock-data';

@Component({
  selector: 'app-confessions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-confessions.component.html',
  styleUrl: './admin-confessions.component.scss',
})
export class AdminConfessionsComponent implements OnInit {
  confessions: Confession[] = [];
  loading = true;

  constructor(private confessionService: ConfessionsService) {}

  // ngOnInit(): void {
  //      this.confessionService.getAllConfessions().subscribe({
  //     next: (data) => {
  //       this.confessions = data;
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.error('Failed to load confessions', err);
  //       this.loading = false;
  //     },
  //   });
  // }

  ngOnInit(): void {
    this.confessions = MOCK_CONFESSIONS;
  }
}
