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
  styleUrls: ['./admin-confessions.component.scss'],
})
export class AdminConfessionsComponent implements OnInit {
  confessions: Confession[] = [];
  filteredConfessions: Confession[] = [];
  loading = true;
  search = '';
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor(private confessionService: ConfessionsService) {}

  ngOnInit(): void {
    this.confessionService.getAllConfessions().subscribe({
      next: (data) => {
        this.confessions = data;

        this.applySearchAndSort();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load confessions', err);
        this.loadMockData();
      },
    });
  }

  loadMockData(): void {
    const mock: Confession[] = [
      {
        id: 1,
        message: 'I secretly love pineapple on pizza 🍍🍕',
        category: 'Food',
        emotion: 'Guilty',
        is_approved: false,
        created_at: new Date().toISOString(),
      },
    ];
    this.confessions = mock;

    this.applySearchAndSort();
    this.loading = false;
  }

  applySearchAndSort(): void {
    const filtered = this.confessions.filter((c) =>
      c.message.toLowerCase().includes(this.search.toLowerCase())
    );

    this.filteredConfessions = filtered.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applySearchAndSort();
  }

  deleteConfession(id: number): void {
    if (confirm('Are you sure you want to delete this confession?')) {
      this.confessions = this.confessions.filter((c) => c.id !== id);
      this.applySearchAndSort();
    }
  }
  approveConfession(confession: Confession): void {
    this.confessionService.approveConfession(confession.id).subscribe(() => {
      confession.is_approved = true;
    });
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
