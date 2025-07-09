import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfessionsService } from '../../core/services/confessions.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confession',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './confessions.component.html',
  styleUrls: ['./confessions.component.scss']
})
export class ConfessionsComponent {
  form: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(private fb: FormBuilder, private confessionService: ConfessionsService) {
    this.form = this.fb.group({
      name: [''],
      email: ['', Validators.email],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const confessionData = {
      message: this.form.value.message,
      category: 'general',
      emotion: 'neutral',
    };

    this.confessionService.submitConfession(confessionData).subscribe({
      next: () => {
        this.submitted = true;
        this.successMessage = 'Thanks for your confession!';
        this.form.reset();
      },
      error: () => {
        this.successMessage = 'Something went wrong. Please try again.';
      }
    });
  }
}
