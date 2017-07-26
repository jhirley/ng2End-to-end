import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../adminShared/user.service';

@Component({
   
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.css']
})

export class AdminMenuComponent implements OnInit {
    theUser: string; 

    constructor(         
        private router : Router,
        private userService : UserService
    ) {  }

    ngOnInit() {
        this.theUser = this.userService.loggedInUser;
     }
    logout() {
        this.userService.logout();
        this.router.navigate(['']);
    }
}