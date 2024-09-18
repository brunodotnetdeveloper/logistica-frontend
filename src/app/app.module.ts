import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './views/clients/details/details.component';
import { FormComponent } from './views/clients/form/form.component';
import { ListComponent } from './views/clients/list/list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';  
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http'; 
import { ClientService } from './services/client.service';
import { MatSelect } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    FormComponent,
    ListComponent,
    DashboardComponent,
  ],
  imports: [
    HttpClientModule ,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,  
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSelect,
    MatOption
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    ClientService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
