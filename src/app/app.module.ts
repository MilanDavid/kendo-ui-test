import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { CatalogComponent } from './catalog/catalog.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { CateroriesDetailsComponent } from './catalog/caterories-details/caterories-details.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment.prod';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { UsersService } from './services/users.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CatalogComponent,
    CateroriesDetailsComponent
  ],
  imports: [
    BrowserModule,
    InputsModule,
    HttpClientModule,
    FormsModule,
    GridModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'catalog', component: CatalogComponent, canActivate: [AuthGuardService]}
    ]),
    GridModule,
    DialogsModule
  ],
  providers: [AuthGuardService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
