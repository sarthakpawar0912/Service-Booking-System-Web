import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupCompanyComponent } from './basic/components/signup-company/signup-company.component';
import { SignupClientComponent } from './basic/components/signup-client/signup-client.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SignupComponent } from './basic/components/signup/signup.component';
import { CompanyComponent } from './company/company.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  { path: 'register_company', component: SignupCompanyComponent }, 
  { path: 'register_client', component: SignupClientComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: SignupComponent }, 
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  
  { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  { path: 'client/dashboard', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  { path: 'client', component: ClientComponent },
  
  { path: 'company', component: CompanyComponent },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  { path: 'company/dashboard', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
