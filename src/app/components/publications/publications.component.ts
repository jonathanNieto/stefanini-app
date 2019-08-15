import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Publication } from 'src/app/models/Publication.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatSort } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Author } from 'src/app/models/Author.interface';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PublicationsComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  loading = false;
  dataSource: any;
  author: Author | null;
  columnsToDisplay = ['id', 'title', 'date'];
  expandedElement: Publication | null;

  constructor(private service: ApiService) { }

  ngOnInit() {
    this.loading = true;
    this.service.getPublications()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<Publication>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAuthor(id: string) {
    this.service.getAuthor(id)
      .subscribe(author => this.author = author);
  }

  loadAuthor(element: any) {
    if (this.expandedElement === element) {
      this.expandedElement = null;
    } else {
      this.expandedElement = element;
    }
    this.getAuthor(element.authorId);
  }
}
