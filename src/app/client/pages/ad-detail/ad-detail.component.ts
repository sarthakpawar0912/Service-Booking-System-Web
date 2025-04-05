import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';

@Component({
  selector: 'app-ad-detail',
  standalone: false,
  templateUrl: './ad-detail.component.html',
  styleUrl: './ad-detail.component.scss'
})


export class AdDetailComponent {
  adId!: string;
  avatarUrl: any;
  ad: any;
  reviews: any[] = [];

  validateForm!: FormGroup;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private notification: NzNotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.adId = this.activatedRoute.snapshot.params['adId'];

    this.validateForm = this.fb.group({
      bookDate: [null, [Validators.required]]
    });

    this.getAdDetailsById();
  }

  getAdDetailsById() {
    this.clientService.getAdDetailsByAdId(this.adId).subscribe({
      next: (res) => {
        console.log(res);
        this.avatarUrl = 'data:image/jpeg;base64,' + res.adDTO.returnedImg;
        this.ad = res.adDTO;
        this.reviews = res.reviewDTOList; // Fixed typo from reviewSTOList
      },
      error: (err) => {
        console.error(err);
        this.notification.error('Error', 'Failed to load ad details');
      }
    });
  }

  bookService() {
    console.log('Form valid:', this.validateForm.valid);
    console.log('Form value:', this.validateForm.value);

    if (this.validateForm.valid) {
      const userId = Number(UserStorageService.getUserId());
      if (isNaN(userId)) {
        this.notification.error('Error', 'User not logged in');
        return;
      }

      const bookDate = this.validateForm.get('bookDate')?.value;
      const formattedBookDate = bookDate instanceof Date ? bookDate.toISOString() : bookDate;

      const bookServiceDTO = {
        bookDate: formattedBookDate,
        adId: Number(this.adId),
        userId: userId
      };

      console.log('Sending DTO:', bookServiceDTO);

      this.clientService.bookService(bookServiceDTO).subscribe({
        next: (res) => {
          console.log('Booking response:', res);
          // Handle both plain string and JSON response
          const message = typeof res === 'string' ? res : res.message || 'Request posted successfully';
          this.notification.success('SUCCESS', message, { nzDuration: 5000 });
          this.router.navigateByUrl('/client/bookings');
        },
        error: (err) => {
          console.error('Booking error details:', {
            status: err.status,
            statusText: err.statusText,
            error: err.error,
            message: err.message
          });
          let errorMessage = 'Failed to book service';
          if (err.status === 401) errorMessage = 'Unauthorized: Please log in again';
          else if (err.status === 404) errorMessage = 'Ad or User not found';
          else if (err.error?.message) errorMessage = err.error.message;
          this.notification.error('Error', errorMessage);
        }
      });
    } else {
      this.notification.error('Error', 'Please select a booking date');
    }
  }
}
  


