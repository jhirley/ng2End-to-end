import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate{

    userLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;

    constructor(private router: Router) {
        firebase.initializeApp({
        apiKey: "AIzaSyAeryrwysbBrKheYohyvkvw7f2kbcKvPp4",
        authDomain: "gigabytegames-10d59.firebaseapp.com",
        databaseURL: "https://gigabytegames-10d59.firebaseio.com",
        // projectId: "gigabytegames-10d59",
        storageBucket: "gigabytegames-10d59.appspot.com",
        messagingSenderId: "618503999020"
        })
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) { return true ;}

        this.router.navigate(['/admin/login']);
        return false;
    }


    resgister(email:string, password:string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch( function(error){
                alert(`${error.message} Please try again!`);
            })
    }
    login(email:string, password:string){
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch( function(error){
                alert(`${error.message} Please try again!`);
            })
    }

    verifyUser() {
        this.authUser = firebase.auth().currentUser;
        if (this.authUser) {
            alert(`Welcome ${this.authUser.email}`);
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/admin']);
        }
    }
    logout(){
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function(){
            alert(`Logged Out!`);
        }, function(error) {
            alert(`${error.message} Unable to Logout. Try Again!`);
        });
    }

} 
