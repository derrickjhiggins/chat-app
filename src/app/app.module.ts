import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'; // Import your AppRoutingModule
import { AppComponent } from './app.component';
import { routes } from './app-routing.module';
import { provideRouter } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
    // Other components, directives, pipes
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule // Import AppRoutingModule where routes are defined
  ],
  providers: [
    provideRouter(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
