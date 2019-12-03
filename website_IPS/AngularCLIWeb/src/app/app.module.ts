import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MasonryGalleryModule } from 'ngx-masonry-gallery';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxGalleryModule } from 'ngx-gallery';
import { AngularDraggableModule } from 'angular2-draggable';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatInputModule, MatOptionModule, MatIcon} from '@angular/material';
import { MatIconModule, MatCheckboxModule } from '@angular/material';

import { AppComponent } from './app.component';
import { WordComponent} from './word/word.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { ServiceComponent } from './service/service.component';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DatabaseComponent } from './database/database.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PriceCalculateComponent } from './price-calculate/price-calculate.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'price', component: PriceCalculateComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    WordComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ProductComponent,
    ServiceComponent,
    HomeComponent,
    HomepageComponent,
    DatabaseComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    PriceCalculateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MasonryGalleryModule,
    NgxPageScrollCoreModule,
    NgxPageScrollModule,
    NgxGalleryModule,
    AngularDraggableModule,
    Angular2ImageGalleryModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    NgxCaptchaModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
