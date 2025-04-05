import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-dashboard',
  standalone: false,
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.scss'
})
export class CompanyDashboardComponent {
  bookings: any[] = [];

  constructor(
    private companyService: CompanyService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.getAllAdBookings();
  }

  getAllAdBookings() {
    this.companyService.getAllAdBookings().subscribe({
      next: (res) => {
        this.bookings = res;
        console.log('Bookings:', res);
      },
      error: (error) => {
        this.notification.error(
          'ERROR',
          `Failed to load bookings: ${error.message}`,
          { nzDuration: 5000 }
        );
      }
    });
  }

  changeBookingStatus(bookingId: number, status: string) {
    console.log('Changing status for booking:', bookingId, 'to', status); // Debug
    this.companyService.changeBookingStatus(bookingId, status).subscribe({
      next: (res) => {
        this.notification.success(
          'SUCCESS',
          `Booking Status Changed successfully`,
          { nzDuration: 5000 }
        );
        this.getAllAdBookings(); // Refresh the list
      },
      error: (error) => {
        console.error('Error details:', error); // Log full error
        this.notification.error(
          'ERROR',
          `Failed to change booking status: ${error.status} - ${error.statusText}`,
          { nzDuration: 5000 }
        );
      }
    });
  }
}