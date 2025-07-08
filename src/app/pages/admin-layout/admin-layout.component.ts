import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../shared/utils/services/toast.service';
import { ThemeToggleComponent } from '../../shared/utils/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, ThemeToggleComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['../../admin/admin-dashboard/admin-dashboard.component.scss'],
})
export class AdminLayoutComponent {
  isSidebarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  logout() {
    this.authService.logout();
    this.toast.show('You have successfully logged out', 'success');
    this.router.navigate(['/login']);
  }
}
