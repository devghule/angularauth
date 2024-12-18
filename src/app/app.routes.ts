import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' }, // Default route redirecting to 'login'
  { path: 'login', component: LoginComponent }, // Login route
  { path: 'register', component: RegisterComponent }, // Register route
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    //canActivate: [AuthGuard] // Protecting 'dashboard' route with AuthGuard
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Register the routes with the root router
  exports: [RouterModule] // Export RouterModule to make it available throughout the app
})
export class AppRoutingModule { }
