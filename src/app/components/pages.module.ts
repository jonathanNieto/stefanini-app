import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

/* angular material modules */
import {
    MatSidenavModule, MatTableModule, MatInputModule, MatSortModule, MatPaginatorModule,
    MatButtonModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatToolbarModule,
    MatListModule, MatCheckboxModule
} from '@angular/material';

/* components */
import { PagesComponent } from './pages.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PublicationsComponent } from './publications/publications.component';
import { AuthorComponent } from './author/author.component';
import { PagesRoutingModule } from './pages.routing';
import { AboutComponent } from './about/about.component';

const MaterialComponents = [
    MatSidenavModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCheckboxModule,
];

@NgModule({
    declarations: [
        PagesComponent,
        SidebarComponent,
        PublicationsComponent,
        AuthorComponent,
        AboutComponent,
    ],
    imports: [
        CommonModule,
        ...MaterialComponents,
        HttpClientModule,
        PagesRoutingModule
    ],
    exports: [...MaterialComponents],
    providers: [],
})
export class PagesModule { }
