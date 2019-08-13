import { Component, OnInit } from '@angular/core';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  onDelete(): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '250px',
      data: {id: 12}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Dialog was closed', result);
    })
  }

}
