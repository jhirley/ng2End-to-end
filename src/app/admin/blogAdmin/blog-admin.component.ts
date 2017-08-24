
import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { BlogAdminService } from '../adminShared/blog-admin.service';
import { Blog } from '../adminShared/blog';

@Component({
    templateUrl: './blog-admin.component.html'
    , styleUrls: ['./blog-admin.component.css']
})

export class BlogAdminComponent implements OnInit {
    theUser: string;
    menuChoice: string;
    blogPosts: Blog[];

    constructor(
        private userService: UserService,
        private router: Router,
        private blogAdminService : BlogAdminService
    ) { }

    ngOnInit() { 
        this.theUser = this.userService.loggedInUser;
        this.getPosts();
    }

    getPosts(){
        let dbRef = firebase.database().ref('blogPosts/');
        dbRef.once('value')
            .then((snapshot)=> {
                let tmp: string[] = snapshot.val();
                this.blogPosts = Object.keys(tmp).map(key => tmp[key])
            });
    }

    logOut(){
        this.userService.logout();
        this.router.navigate(['']);
    }

    chooseMode(mode: string){
        this.menuChoice = mode;
    }
}