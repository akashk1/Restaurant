import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { DishServiceService } from './dish-service.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ContactComponent } from './contact/contact.component';
import { PromotionService } from './promotion.service';
import { LeaderService } from './leader.service';
import { AboutComponent } from './about/about.component';
import {MatSliderModule} from '@angular/material/slider';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {baseURL} from './menu/shared/baseurl';
import { HighlightDirective } from './directive/highlight.directive';
import { FeedbackServiceService } from './feedback-service.service';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishDetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatListModule,
    FlexLayoutModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  entryComponents: [LoginComponent],
  providers: [DishServiceService,
     PromotionService,
      LeaderService,FeedbackServiceService,
      {provide: 'BaseUrl', useValue: baseURL}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
