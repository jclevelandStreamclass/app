import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceSportPlayer } from './service/sport-players-service';
import { CategoryAdminCreateModalComponent } from '../../shared/modals/category-admin-create/category-admin-create.component';

export interface CategoryData {
  id: string;
  name: string;
  photo: string;
}

@Component({
  selector: 'app-sport-players',
  templateUrl: './sport-players.component.html',
  styleUrls: ['./sport-players.component.scss']
})
export class SportPlayersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'photo', 'Editar'];
  dataSource: MatTableDataSource<CategoryData>;
  data: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private sportPlayerSvc: ServiceSportPlayer,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() { }

  openDialog() {
    const dialogRef = this.dialog.open(CategoryAdminCreateModalComponent).addPanelClass('formDialog');
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sportPlayerSvc.insertCategory(result).subscribe((x) => {
          this.ngAfterViewInit();
        });
      }
    });
  }

  openEditDialog(data: any) {
    const dialogRef = this.dialog.open(CategoryAdminCreateModalComponent, { data }).addPanelClass('formDialog');
    dialogRef.afterClosed().subscribe(result => {
      //this.categorySvc.insertCategory(result).subscribe((x) => {        
      this.ngAfterViewInit();
      // });
    });
  }

  deleteCategory(id) {
    var r = confirm("¿Esta seguro de eliminar la categoría?");
    if (r) {
      this.sportPlayerSvc.deleteCategories(id).subscribe((x) => {
        this.ngAfterViewInit();
      });
    }
  }

  ngAfterViewInit() {
    this.sportPlayerSvc.getCategories().subscribe((x) => {
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
