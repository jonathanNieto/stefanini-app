import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Author } from 'src/app/models/Author.interface';
import { Publication } from 'src/app/models/Publication.interface';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AuthorComponent implements OnInit, DoCheck {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  loadingCard = false;
  loadingTable = false;
  dataSource: any;
  id: string;
  oldId: string;
  author: Author;
  columnsToDisplay = ['id', 'title', 'date'];
  expandedElement: Publication | null;

  constructor(private service: ApiService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit() {
    this.loadingCard = true;
    this.loadingTable = true;
    this.service.getAuthorPublications(this.id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<Publication>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loadingTable = false;
      });

    this.service.getAuthor(this.id)
      .subscribe((author) => {
        this.author = author;
        this.loadingCard = false;
      });

    this.oldId = this.id;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngDoCheck() {
    if (this.oldId !== this.id) {
      this.service.getAuthorPublications(this.id)
        .subscribe(data => {
          this.dataSource = new MatTableDataSource<Publication>(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });

      this.service.getAuthor(this.id)
        .subscribe((author) => {
          this.author = author;
        });

      this.oldId = this.id;
    }
  }
}
