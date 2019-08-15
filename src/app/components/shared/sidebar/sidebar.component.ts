import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Author } from 'src/app/models/Author.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  opened = false;
  authors: Author[] = [];
  displayedColumns: string[] = ['name'];
  dataSource: any;

  constructor(private service: ApiService) { }

  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {
    if (this.authors.length <= 0) {
      this.service.getAuthors()
        .subscribe(authors => this.dataSource = authors);
    }
  }

}
