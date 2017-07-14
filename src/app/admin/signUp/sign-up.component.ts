import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../adminShared/user.service';

@Component({

    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
    constructor(
        private router : Router,
        private userService : UserService
    ) {  }

    ngOnInit() { }
    
    email: string;
    password: string;
    password2: string;
    passwordFail: boolean = false;

    signUp() {
        if (this.password !== this.password2) {
            this.passwordFail = true;
        } else {
            this.passwordFail = false;
            this.userService.resgister(this.email, this.password);
            this.userService.verifyUser();
        }
    }
    cancel() {
        this.router.navigate(['/admin/login']);
    }
}