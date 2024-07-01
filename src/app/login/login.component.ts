import { CommonModule, NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { SharedService } from "../shared/services/shared.service";

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

  constructor(private srvLogin: LoginService, private router: Router,private srvShared: SharedService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('j.doe@example.com', [Validators.required, Validators.email]),
      'password': new FormControl('password123', Validators.required)
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.loginForm.valid) {
      this.srvLogin.loginMethod(this.loginForm.value).subscribe((res: { accessToken: string }) => {
        sessionStorage.setItem('token',res.accessToken)
        this.srvShared.initUserData(res?.accessToken)
        this.router.navigate(['./'])
      })
    }
  }
}
