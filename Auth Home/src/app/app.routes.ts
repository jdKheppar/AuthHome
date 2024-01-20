import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuardGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
    {path: 'home', component: HomeComponent,canActivate:[authGuardGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent,},
    {path: '', component: LoginComponent},
    { path: '**', component:LoginComponent }
    // {path: '', redirectTo: '/login', pathMatch: 'full'},
];
