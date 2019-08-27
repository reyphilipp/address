import { Component, OnInit } from '@angular/core';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, EMPTY } from 'rxjs';
import { Address } from 'src/app/models/address';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {
  address$: Observable<Address>;

  exists = false;

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    postcode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private backend: BackendService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.address$ = this.route.params.pipe(
      switchMap(route => {
        if (route.addressId) {
          this.exists = true;
          return this.backend.getSelectedAddress(route.addressId);
        }
        return EMPTY;
      })
    );
    this.address$.subscribe(address => this.form.patchValue(address));
  }

  onCreate(form: FormGroup): void {
    console.log(form.value);
    this.backend.createAddress(form.value).subscribe(result => {
      this.router.navigate(['/list', result.id]);
      this.snackbar.open('Address created successfully!', 'save', {duration: 3000});
    });
  }

  onUpdate(form: FormGroup): void {
    console.log('update', form.value);
    this.backend.updateAddress(form.value).subscribe(result => {
      this.snackbar.open('Address save successfully!', 'update', {duration: 3000});
    });
  }

  onDelete(form: FormGroup): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '250px',
      data: form.value
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The Dialog was closed', result);
        this.backend.removeAddress(result).subscribe(_ => {
          this.router.navigate(['/list']);
          this.snackbar.open('Address deleted successfully!', 'X', {duration: 3000});
        });
      }
    });
  }
}
