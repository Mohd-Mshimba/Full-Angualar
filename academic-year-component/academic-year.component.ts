import { Component, Inject, OnInit, ViewChild, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AcademicYear } from 'src/app/models/academic-year';
import { AcademicYearService } from 'src/app/services/academic-year/academic-year.service';

@Component({
  selector: 'app-academic-year',
  templateUrl: './academic-year.component.html',
  styleUrls: ['./academic-year.component.css']
})
export class AcademicYearComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['ID', 'academicYearName', 'status','action'];

@ViewChild('callDialog') callDialog!: TemplateRef<any>;
@ViewChild('callEditDialog') callEditDialog!: TemplateRef<any>;
@ViewChild('callStatus0Dialog') callStatus0Dialog!: TemplateRef<any>;
@ViewChild('callStatus1Dialog') callStatus1Dialog!: TemplateRef<any>;
@ViewChild("paginator") paginator!: MatPaginator;
@ViewChild(MatSort) matSort!: MatSort;

openDialog() {
  let dialogRef = this.dialog.open(this.callDialog);
  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined) {
      if (result !== 'no') {
        const enabled = "Y"
        console.log(result);
      } else if (result === 'no') {
        console.log('User clicked no.');
      }
    }
  })
}
openEditDialog() {
  let dialogRef = this.dialog.open(this.callEditDialog);
  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined) {
      if (result !== 'no') {
        const enabled = "Y"
        console.log(result);
      } else if (result === 'no') {
        console.log('User clicked no.');
      }
    }
  })
}
openStatus0Dialog() {
  let dialogRef = this.dialog.open(this.callStatus0Dialog);
  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined) {
      if (result !== 'no') {
        const enabled = "Y"
        console.log(result);
      } else if (result === 'no') {
        console.log('User clicked no.');
      }
    }
  })
}
openStatus1Dialog() {
  let dialogRef = this.dialog.open(this.callStatus1Dialog);
  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined) {
      if (result !== 'no') {
        const enabled = "Y"
        console.log(result);
      } else if (result === 'no') {
        console.log('User clicked no.');
      }
    }
  })
}
page = 0;
itemsPerPage = 100000000;
loading: boolean = true;
formData!: FormGroup;
academics: AcademicYear[] = [];

academicyearid: any;
academicyearname: any;
statuss: any;

constructor(
  private academicService: AcademicYearService,
  public dialog: MatDialog) { }
ngOnInit(): void {
  this.dataSource = new MatTableDataSource();
  this.getAllData();
  this.createData();
}


getAllData() {
  this.academicService.getAllPage(this.page, this.itemsPerPage).subscribe((data: any[]) => {
    this.loading = false;
    this.academics = data;
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator =  this.paginator;
    this.dataSource.sort = this.matSort;
    console.log(data);
  });
}

// INSERT DATA
createData() {
  this.formData = new FormGroup({
    academicYearId: new FormControl('', [Validators.required]),
    academicYearName: new FormControl('', [Validators.required]),
    status: new FormControl('1', [Validators.required]),
  });
}
submit() {
  console.log(this.formData.value);
  this.academicService.create(this.formData.value).subscribe(res => {
    console.log('Data Inserted Successfully!');
    this.getAllData();
    this. addAlert();
  })
}

// UPDATE DATA
callDataById(detail: any) {
  this.academicService.get(detail.academicYearId).subscribe((data) => {
    this.academicyearid = data.academicYearId;
    this.academicyearname = data.academicYearName;
    this.statuss = data.status;
    console.log(data);
  
    this.formData = new FormGroup({
      academicYearId: new FormControl(this.academicyearid),
      academicYearName: new FormControl(this.academicyearname),
      status: new FormControl(this.statuss),
    })
  });
}

editSubmit(){
  console.log(this.formData.value);
  this.academicService.update(this.academicyearid, this.formData.value).subscribe(res => {
    console.log('Data Updated Successfully!');
    console.log(res);
    this.getAllData();
    this.editAlert();
  })
}


// UPDATE STATUS
callUpdate(st: any){
  this.academicService.get(st.academicYearId).subscribe((data) => {
    this.academicyearid = data.academicYearId;
    this.academicyearname = data.academicYearName;
    this.statuss = data.status;
    if(this.statuss==1){
      this.formData = new FormGroup({
        academicYearId: new FormControl(this.academicyearid),
        academicYearName: new FormControl(this.academicyearname),
        status: new FormControl(0),
      })
      console.log(this.statuss);
    }else{
      this.formData = new FormGroup({
        academicYearId: new FormControl(this.academicyearid),
        academicYearName: new FormControl(this.academicyearname),
        status: new FormControl(1),
      })
      console.log(this.statuss);
    }
  });
}

updateStat(){
  console.log(this.formData.value);
  this.academicService.update(this.academicyearid, this.formData.value).subscribe(res => {
    console.log('Data Updated Successfully!');
    console.log(res);
    this.getAllData();
    this.statusAlert();
  })
}

// SEARCH
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  // ALERT 
  statusAlert() {
    Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Success to Activate Status', icon: 'success', });
  }
  addAlert() {
    Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Success to Add Data', icon: 'success', });
  }
  editAlert() {
    Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Success to Update Data', icon: 'success', });
  }
}