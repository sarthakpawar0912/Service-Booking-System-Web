import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-my-bookings',
  standalone: false,
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})

export class MyBookingsComponent {

  bookedServices:any;
  constructor(private clientService:ClientService){}

  ngOnInit(){
    this.getMyBookings();
  }

  getMyBookings(){
    this.clientService.getMyBookings().subscribe(res=>{
      this.bookedServices=res;
    })
  }
  
}
