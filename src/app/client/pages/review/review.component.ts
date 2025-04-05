import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';

@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
bookService() {
throw new Error('Method not implemented.');
}
  bookId: number;
  userId: number;
  validateForm: FormGroup;
  isSubmitting = false;
ad: any;
avatarUrl: any;
reviews: any;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute
  ) {
    // Properly parse bookId from route params
    const routeId = this.activatedRoute.snapshot.params['id'];
    this.bookId = Number(routeId); // Ensure proper number conversion
    this.userId = UserStorageService.getUserId();
    
    console.log('Retrieved userId:', this.userId, typeof this.userId);
    console.log('Retrieved bookId:', this.bookId, typeof this.bookId);

    if (isNaN(this.bookId)) {
      console.error('Invalid bookId:', routeId);
      this.notification.error('ERROR', 'Invalid booking ID', { nzDuration: 5000 });
      this.router.navigateByUrl('/client/bookings');
    }

    this.validateForm = this.fb.group({
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      review: [null, [Validators.required, Validators.minLength(2)]]
    });
  }

  giveReview() {
    // Validate all form controls
    Object.values(this.validateForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    if (this.validateForm.invalid || this.isSubmitting) {
      return;
    }

    // Double-check bookId is valid
    if (isNaN(this.bookId)) {
      this.notification.error('ERROR', 'Invalid booking ID', { nzDuration: 5000 });
      return;
    }

    this.isSubmitting = true;
    
    const reviewDTO = {
      rating: Math.round(this.validateForm.get('rating')?.value),
      review: this.validateForm.get('review')?.value?.trim(),
      userId: this.userId,
      bookId: this.bookId
    };

    console.log('Submitting review with data:', reviewDTO);

    this.clientService.giveReview(reviewDTO).subscribe({
      next: (res) => {
        this.notification.success('SUCCESS', res.message || 'Review posted successfully', {
          nzDuration: 5000
        });
        this.router.navigateByUrl('/client/bookings');
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Review submission error:', error);
        
        let errorMsg = 'Failed to submit review';
        if (error.error?.message) {
          errorMsg = error.error.message;
        } else if (error.message) {
          errorMsg = error.message;
        }

        this.notification.error('ERROR', errorMsg, {
          nzDuration: 5000
        });
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}