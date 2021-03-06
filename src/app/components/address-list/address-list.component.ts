import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  addresses$: Observable<Address[]>;

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.addresses$ = this.backend.getAllAddresses();
  }

}
