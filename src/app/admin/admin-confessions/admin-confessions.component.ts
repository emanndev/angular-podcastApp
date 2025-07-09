import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfessionsService } from '../../core/services/confessions.service';
import { Confession } from '../../model/podcast.models';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../shared/utils/services/toast.service';

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
  paginatedConfessions: Confession[] = [];

  loading = true;
  search = '';

  // sorting/pagination
  sortColumn: 'created_at' | 'is_approved' = 'created_at';
  sortAsc = false;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  constructor(
    private confessionService: ConfessionsService,
    private toast: ToastService
  ) {}

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
    let filtered = this.confessions.filter((c) =>
      c.message.toLowerCase().includes(this.search.toLowerCase())
    );

    filtered = filtered.sort((a, b) => {
      if (this.sortColumn === 'created_at') {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return this.sortAsc ? dateA - dateB : dateB - dateA;
      } else if (this.sortColumn === 'is_approved') {
        const valA = a.is_approved ? 1 : 0;
        const valB = b.is_approved ? 1 : 0;
        return this.sortAsc ? valA - valB : valB - valA;
      }
      return 0;
    });

    this.filteredConfessions = filtered;
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    this.paginate();
  }

  paginate(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedConfessions = this.filteredConfessions.slice(start, end);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  toggleSortOrder(): void {
    this.sortAsc = !this.sortAsc;
    this.applySearchAndSort();
  }

  changeSort(column: 'created_at' | 'is_approved'): void {
    if (this.sortColumn === column) {
      this.toggleSortOrder();
    } else {
      this.sortColumn = column;
      this.sortAsc = false;
      this.applySearchAndSort();
    }
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
      this.toast.show('Confession approved!', 'success');
      this.applySearchAndSort();
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
