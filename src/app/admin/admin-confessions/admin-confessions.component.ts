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
        this.loading = false;
      },
    });
  }

  ngOnChanges(): void {
    this.applySearch();
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
