import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PagesComponent } from './pages.component';
import { PublicationsComponent } from './publications/publications.component';
import { AuthorComponent } from './author/author.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'publications', component: PublicationsComponent },
            { path: 'authors/:id/publications', component: AuthorComponent },
            { path: 'about', component: AboutComponent },
            { path: '', redirectTo: 'publications', pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
