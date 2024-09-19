import { LOCALE_ID, NgModule } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http'; 
import { ClientService } from './services/client.service';
import { MatSelect } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditClientModalComponent } from './views/clients/details/edit-client-modal/edit-client-modal.component';
import { EditAddressModalComponent } from './views/clients/details/edit-address-modal/edit-address-modal.component';
import { NgxMaskDirective, provideNgxMask  } from 'ngx-mask';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CustomDateAdapter } from './models/custom-date-adapter';

// Registrar a localização pt-BR para usar o formato de data brasileiro
// registerLocaleData(localePt);

// export const MY_DATE_FORMATS = {
//   display: {
//     dateInput: 'DD/MM/YYYY',
//     monthYearLabel: 'MMMM YYYY',
//     dateA11yLabel: 'DD/MM/YYYY',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
//   parse: {
//     dateInput: 'DD/MM/YYYY',
//   },
// };

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    FormComponent,
    ListComponent,
    DashboardComponent,
    EditClientModalComponent,
    EditAddressModalComponent
  ],
  imports: [
    FlexLayoutModule,
    FlexLayoutServerModule,
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
    MatOption,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    ClientService,
    provideNgxMask({}),
    // { provide: DateAdapter, useClass: CustomDateAdapter },
    // { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    // { provide: LOCALE_ID, useValue: 'pt-BR' },  
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
