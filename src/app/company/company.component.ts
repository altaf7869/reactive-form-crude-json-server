import { Component, OnInit, ViewChild } from '@angular/core';
import { companymodel } from '../Model/companymodel';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companydata!: companymodel[];
  displayedColumns: string[] = ["id", "name", "empcount", "revenue", "address", "isactive", "action"]
  finaldata:any;
  @ViewChild(MatPaginator) _paginator!:MatPaginator
  @ViewChild(MatSort) _sort!:MatSort

  constructor(private dialog: MatDialog, private apiservice: ApiService) { }

  ngOnInit(): void {
    this.LoadCompany();
  }

  Openpopup(id: any) {
    const popup = this.dialog.open(PopupComponent, {
      width: '800px',
      // exitAnimationDuration: '1000ms',
      // enterAnimationDuration: '500ms',
      data: {
        id: id
      }
    })
    popup.afterClosed().subscribe(res => {
      this.LoadCompany();
    })
  }

  LoadCompany() {
    this.apiservice.GetAllCompany().subscribe(response => {
      this.companydata = response;
      this.finaldata = new MatTableDataSource<companymodel>(this.companydata);
      this.finaldata.paginator = this._paginator;
      this.finaldata.sort = this._sort;

    })
  }

  EditCompany(id: any) {
    this.Openpopup(id);
  }
  RemoveCompany(id: any) {
    this.apiservice.RemoveCompanyById(id).subscribe(res => {
      this.LoadCompany();
      alert("Deleted successfully")

    })
  }

}
