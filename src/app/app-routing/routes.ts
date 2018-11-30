import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';
import { ContactComponent } from '../contact/contact.component';
import { DishDetailComponent } from '../dish-detail/dish-detail.component';
import { AboutComponent } from '../about/about.component';


export const routes: Routes = [
    {path: 'home' , component: HomeComponent},
    {path: 'menu' , component: MenuComponent},
    {path: 'dish-detail/:id' , component: DishDetailComponent},
    { path: 'contactus',     component: ContactComponent },
    { path: 'about',     component: AboutComponent },
    {path: '' , redirectTo: '/home', pathMatch: 'full'}
];
