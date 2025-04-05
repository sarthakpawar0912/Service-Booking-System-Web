import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-dashboard',
  standalone: false,
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent {
  ads: any[] = [];
  validateForm!: FormGroup;


  constructor(private clientService: ClientService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      Service: ['', [Validators.required]]
    });
    this.getAllAds();
    
    // Add value changes listener for real-time search
    this.validateForm.get('Service')?.valueChanges.subscribe(value => {
      if (value && value.length > 0) {
        this.searchAdByName(value);
      } else {
        this.getAllAds();
      }
    });
  }

  getAllAds() {
    this.clientService.getAllAds().subscribe({
      next: (res) => {
        this.ads = res;
      },
      error: (err) => {
        console.error("Error fetching ads:", err);
      }
    });
  }

  updateImg(img: string | null): string {
    if (!img) {
      return 'assets/default-ad.jpg'; // Fallback image
    }
    return `data:image/png;base64,${img}`;
  }

  
  searchAdByName(searchTerm: string) {
    if (!searchTerm) {
      this.getAllAds();
      return;
    }

    this.clientService.searchAdByName(searchTerm).subscribe({
      next: (res) => {
        this.ads = res;
      },
      error: (err) => {
        console.error("Error searching ads:", err);
        this.ads = []; // Clear results on error
      }
    });
  }
}