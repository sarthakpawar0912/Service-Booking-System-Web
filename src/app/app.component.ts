import { Component } from '@angular/core';
import { UserStorageService } from './basic/services/storage/user-storage.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isCollapsed = false;
  isClientLoggedIn: boolean = false;
  isCompanyLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateLoginStatus();

    // Update navbar when navigation changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus();
      }
    });
  }

  updateLoginStatus() {
    this.isClientLoggedIn = UserStorageService.isClientLoggedIn();
    this.isCompanyLoggedIn = UserStorageService.isCompanyLoggedIn();
    console.log('Navbar Updated: Client:', this.isClientLoggedIn, 'Company:', this.isCompanyLoggedIn);
  }

  logout() {
    UserStorageService.signOut();
    this.updateLoginStatus();
    this.router.navigateByUrl('/login');
  }
  
}