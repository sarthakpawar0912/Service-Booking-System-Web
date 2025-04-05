import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SignupComponent } from './basic/components/signup/signup.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { provideNzI18n } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { DemoNgZorroAntdModule } from './DemoNgZorroAntdModule';
import { SignupClientComponent } from './basic/components/signup-client/signup-client.component';
import { SignupCompanyComponent } from './basic/components/signup-company/signup-company.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

registerLocaleData(en);

@NgModule({
 
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SignupClientComponent,
    SignupCompanyComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    DemoNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule, NzFormModule,         // <-- Import form module
    NzInputModule,        // <-- Import input module
    NzButtonModule,       // <-- Import button module
    NzNotificationModule  // <-- Import notification module
  ],

  providers: [
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
