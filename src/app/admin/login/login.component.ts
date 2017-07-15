import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../adminShared/user.service';

@Component({
   
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    constructor(
        private router : Router,
        private userService : UserService
    ) {  }

    ngOnInit() { }
    
    email: string;
    password: string;

    login() {
        this.userService.login(this.email, this.password);
        this.userService.verifyUser();
    }
    signup() {
        this.router.navigate(['/admin/signup']);
    }
    cancel() {
        this.router.navigate(['']);
    }
}