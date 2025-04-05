import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { IconsProviderModule } from '../icons-provider.module';
import { CreateAdComponent } from './pages/create-ad/create-ad.component';
import { AllAdsComponent } from './pages/all-ads/all-ads.component';
import { UpdateAdComponent } from './pages/update-ad/update-ad.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';


@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDashboardComponent,
    CreateAdComponent,
    AllAdsComponent,
    UpdateAdComponent,
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
     IconsProviderModule,
        NzLayoutModule,
        NzTagModule,
        NzMenuModule,
        DemoNgZorroAntdModule,
        NzTableModule,
        FormsModule,
        ReactiveFormsModule, NzFormModule,         // <-- Import form module
        NzInputModule,        // <-- Import input module
        NzButtonModule,       // <-- Import button module
        NzNotificationModule
  ]
})
export class CompanyModule { }
