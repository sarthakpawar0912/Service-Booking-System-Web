import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { IconsProviderModule } from '../icons-provider.module';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { HttpClientModule } from '@angular/common/http';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ReviewComponent } from './pages/review/review.component';
import { NzRateComponent } from 'ng-zorro-antd/rate';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NzCardComponent } from 'ng-zorro-antd/card';


@NgModule({
  declarations: [
    ClientComponent,
    ClientDashboardComponent,
    AdDetailComponent,
    MyBookingsComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,         // Added for HTTP requests
    FormsModule,             // For template-driven forms (if used elsewhere)
    ReactiveFormsModule,     // For reactive forms (used in AdDetailComponent)
    ClientRoutingModule,
    IconsProviderModule,
    NzCardComponent,
    NzLayoutModule,          // For layout components
    NzMenuModule,
    NzRateComponent,
    NzSpinComponent,            // For menu components
    NzFormModule, 
    NzTableModule,           // For nz-form directives
    NzInputModule,           // For nz-input (if used elsewhere)
    NzButtonModule,          // For nz-button
    NzNotificationModule,    // For notifications
    NzGridModule,            // For nz-row, nz-col
    NzDatePickerModule,      // For nz-date-picker
    DemoNgZorroAntdModule
  ]
})
export class ClientModule { }
