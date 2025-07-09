import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent implements OnInit {
  currentTheme: 'light' | 'dark' = 'light';

  ngOnInit() {
    this.currentTheme =
      (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    this.applyTheme();
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);
    this.applyTheme();
  }

  private applyTheme() {
    const body = document.body;
    if (this.currentTheme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }
}
