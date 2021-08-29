import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ServiceCategoryAdmin} from './service/categoria-admin-service';
export interface UserData {
  id: string;
  name: string;
  photo: string;
}

@Component({
  selector: 'app-categoria-admin',
  templateUrl: './categoria-admin.component.html',
  styleUrls: ['./categoria-admin.component.scss']
})
export class CategoriaAdminComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'photo', 'Editar'];
  dataSource: MatTableDataSource<UserData>;
  data:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private categorySvc: ServiceCategoryAdmin
  ) {
  }

  ngOnInit(){

  }

  ngAfterViewInit() {
    this.categorySvc.getCategories().subscribe((x) => {
      this.data = x;
      console.log("🚀 ~ file: categoria-admin.component.ts ~ line 38 ~ CategoriaAdminComponent ~ this.categorySvc.getCategories ~ x", x)
    });
    
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function createNewUser(id: number): UserData {
  return {
    id: id.toString(),
    name: "name",
    photo: ""
  };
}
