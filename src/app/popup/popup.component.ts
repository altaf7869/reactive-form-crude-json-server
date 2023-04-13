import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit{

  editdata:any

constructor(private builder:FormBuilder, private apiService:ApiService, private dialog:MatDialog,
 @Inject(MAT_DIALOG_DATA) public data:any){

}
  ngOnInit(): void { 
    if(this.data.id!='' && this.data.id!=null){
      this.apiService.GetCompanyById(this.data.id).subscribe(res => {
        this.editdata = res;
        this.companyForm.setValue(
          {
          id:this.editdata.id,
          name:this.editdata.name,
          empcount: this.editdata.empcount,
          revenue:this.editdata.revenue,
          address:this.editdata.address,
          isactive:this.editdata.isactive})
      })
    }
  }

companyForm = this.builder.group({
  id:this.builder.control({value:'', disabled:true}),
  name:this.builder.control('', Validators.required),
  empcount:this.builder.control('', Validators.required),
  revenue:this.builder.control('', Validators.required),
  address:this.builder.control('', Validators.required),
  isactive:this.builder.control(true),
})

SaveCompany(){
  if(this.companyForm.valid){
    const Edited = this.companyForm.getRawValue().id;
    if(Edited!= '' && Edited!=null){
      this.apiService.UpdateCompany(Edited,this.companyForm.getRawValue()).subscribe(response => {
        this.closepopup();
         alert("Updated successfully")
       })
    }else {
      this.apiService.CreateCompany(this.companyForm.value).subscribe(response => {
        this.closepopup();
         alert("Saved successfully")
       })
    }
  }
}

closepopup(){
  this.dialog.closeAll();
}
}
