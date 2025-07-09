// shared/services/toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastMessage, ToastType } from '../../../model/podcast.models';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private messages: ToastMessage[] = [];
  private messages$ = new BehaviorSubject<ToastMessage[]>([]);

  getToasts() {
    return this.messages$.asObservable();
  }

  show(message: string, type: ToastType = 'info') {
    const toast: ToastMessage = {
      id: Date.now(),
      type,
      message,
    };
    this.messages.push(toast);
    this.messages$.next(this.messages);

    setTimeout(() => this.dismiss(toast.id), 4000); 
  }

  dismiss(id: number) {
    this.messages = this.messages.filter((t) => t.id !== id);
    this.messages$.next(this.messages);
  }
}
