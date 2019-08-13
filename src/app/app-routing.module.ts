import { AddressListComponent } from './components/address-list/address-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressDetailComponent } from './components/address-detail/address-detail.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: AddressListComponent
  },
  {
    path: 'list/new',
    component: AddressListComponent
  },
  {
    path: 'list/:addressId',
    component: AddressDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
