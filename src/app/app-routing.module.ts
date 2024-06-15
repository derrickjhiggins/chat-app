import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'chat', component: ChatComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }