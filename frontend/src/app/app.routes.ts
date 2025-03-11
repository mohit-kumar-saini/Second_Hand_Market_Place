import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { AuthGuard } from './guards/auth.guard'; 
import { ProfileComponent } from './components/profile/profile.component'; 


export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent }, 
  { path: 'products/create', component: ProductCreateComponent }, 
  { path: 'products/:id', component: ProductDetailComponent }, 
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/products' } 


];
