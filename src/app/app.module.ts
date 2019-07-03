import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SettingComponent } from './setting/setting.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SettingJsonService } from './service/setting-json/setting-json.service';
import { 
  MatButtonModule, 
  MatCheckboxModule, 
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatDividerModule,} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatDividerModule,
  ],
  providers: [
    SettingJsonService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  events: string[] = [];
  opened: boolean;
}
