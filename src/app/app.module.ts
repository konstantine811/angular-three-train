import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// other modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// own modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
// main components
import { AppComponent } from './app.component';
// services
import { ThemeChangeService } from '@core/services/ui/theme-change.service';
// configs
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    ThemeChangeService,
    {
      provide: APP_INITIALIZER,
      useFactory: (ts: ThemeChangeService) => () => {
        return ts.init();
      },
      deps: [ThemeChangeService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
