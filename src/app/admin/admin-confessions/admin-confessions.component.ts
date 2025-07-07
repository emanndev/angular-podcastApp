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
        this.loadMockData();
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

  deleteConfession(id: number): void {
    if (confirm('Are you sure you want to delete this confession?')) {
      this.confessions = this.confessions.filter((c) => c.id !== id);
      this.applySearch(); // update filtered view
    }
  }

  flagConfession(confession: Confession): void {
    alert(`Confession flagged:\n\n"${confession.message}"`);
  }

  exportAsJSON(): void {
    const blob = new Blob([JSON.stringify(this.filteredConfessions, null, 2)], {
      type: 'application/json',
    });
    this.downloadFile(blob, 'confessions.json');
  }

  exportAsCSV(): void {
    const header = 'ID,Message,Created At\n';
    const rows = this.filteredConfessions
      .map((c) => `${c.id},"${c.message.replace(/"/g, '""')}",${c.created_at}`)
      .join('\n');
    const csv = header + rows;

    const blob = new Blob([csv], { type: 'text/csv' });
    this.downloadFile(blob, 'confessions.csv');
  }

  private downloadFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
