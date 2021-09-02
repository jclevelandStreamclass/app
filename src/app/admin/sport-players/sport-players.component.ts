import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceSportPlayer } from './service/sport-players-service';
import { PlayerAdminCreateModalComponent } from '../../shared/modals/players-admin-create/players-admin-create.component';

export interface PlayerData {
  id: string;
  name: string;
  photo: string;
  bio: string;
  job: string;
}

export interface PlayerData {
  id: string;
  name: string;
  photo: string;
  bio: string;
  job: string;
}

@Component({
  selector: 'app-sport-players',
  templateUrl: './sport-players.component.html',
  styleUrls: ['./sport-players.component.scss']
})
export class SportPlayersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [ 'name', 'photo', 'Editar'];
  dataSource: MatTableDataSource<PlayerData>;
  data: any;
  dataPlayer:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private sportPlayerSvc: ServiceSportPlayer,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() { }

  openDialog() {
    const dialogRef = this.dialog.open(PlayerAdminCreateModalComponent).addPanelClass('formDialog');
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sportPlayerSvc.insertPlayer(result).subscribe((x) => {
          this.ngAfterViewInit();
        });
      }
    });
  }


  retrivePlayer(data:any) {
    this.dataPlayer=data;
  }

  openEditDialog(data: any) {    
    const dialogRef = this.dialog.open(PlayerAdminCreateModalComponent, { data }).addPanelClass('formDialog');
    dialogRef.afterClosed().subscribe(result => {     
      this.sportPlayerSvc.updateplayer(result.get('id'),result).subscribe((x) => {        
        this.ngAfterViewInit();
      });
    });
  }

  deleteCategory(id) {
    var r = confirm("¿Esta seguro de eliminar al deportista?");
    if (r) {
      this.sportPlayerSvc.deleteCategories(id).subscribe((x) => {
        this.ngAfterViewInit();
      });
    }
  }

  ngAfterViewInit() {
    this.sportPlayerSvc.getPlayers().subscribe((x) => {
    console.log("🚀 ~ file: sport-players.component.ts ~ line 78 ~ SportPlayersComponent ~ this.sportPlayerSvc.getPlayers ~ x", x)
      
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
