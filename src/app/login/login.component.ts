import { CommonModule, NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSubmit = false;

  constructor(private srvLogin: LoginService,private router:Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.loginForm.valid) {
      this.srvLogin.loginMethod(this.loginForm.value).subscribe((res: Object) => {
        console.log(res)
        this.router.navigate(['./'])
      })
    }
  }
}
