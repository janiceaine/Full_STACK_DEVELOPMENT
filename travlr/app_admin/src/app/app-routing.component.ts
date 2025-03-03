import { Routes } from '@angular/router';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {path: 'add-trip', component: AddTripComponent },
    {path: 'edit-trip', component: EditTripComponent },
    {path: 'login', component: LoginComponent },
    {path: '', component: HomeComponent, pathMatch: 'full' },
]