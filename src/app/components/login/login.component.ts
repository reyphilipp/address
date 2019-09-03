import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    console.log('onSubmit');
    const {value} = form;
    this.auth.login(value.username, value.password);
  }

}
