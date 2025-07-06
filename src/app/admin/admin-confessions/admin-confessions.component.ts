import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfessionsService } from '../../core/services/confessions.service';
import { Confession } from '../../model/podcast.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confessions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-confessions.component.html',
  styleUrl: './admin-confessions.component.scss',
})
export class AdminConfessionsComponent implements OnInit {
  confessions: Confession[] = [];
  filteredConfessions: Confession[] = [];
  loading = true;
  search = '';

  constructor(private confessionService: ConfessionsService) {}

  ngOnInit(): void {
    this.confessionService.getAllConfessions().subscribe({
      next: (data) => {
        this.confessions = data;
        this.filteredConfessions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load confessions', err);
        this.loadMockData(); // fallback
      },
    });
  }

  loadMockData() {
    const mock: Confession[] = [
      {
        id: 1,
        message: 'I secretly love pineapple on pizza 🍍🍕',
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        message: 'I talk to myself to sound smarter in meetings 😅',
        created_at: new Date().toISOString(),
      },
      {
        id: 3,
        message: 'Sometimes I miss deadlines just to feel something 😬',
        created_at: new Date().toISOString(),
      },
    ];

    this.confessions = mock;
    this.filteredConfessions = mock;
    this.loading = false;
  }

  ngDoCheck(): void {
    this.applySearch();
  }

  applySearch(): void {
    this.filteredConfessions = this.confessions.filter((c) =>
      c.message.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
