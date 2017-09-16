
import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductAdminService } from '../adminShared/product-admin.service';
import { Product } from '../adminShared/product';

@Component({
    templateUrl: './product-admin.component.html'
    , styleUrls: ['./product-admin.component.css']
})

export class ProductAdminComponent implements OnInit {
    theUser: string;
    menuChoice: string;
    theProducts: Product[];
    formDisplay: boolean = true;
    singleProduct: Product;

    constructor(
        private userService: UserService,
        private router: Router,
        private productAdminService : ProductAdminService
    ) { }

    ngOnInit() { 
        this.theUser = this.userService.loggedInUser;
        this.getProducts();
    }

    getProducts(){
        let dbRef = firebase.database().ref('products/');
        dbRef.once('value')
            .then((snapshot)=> {
                let tmp: string[] = snapshot.val();
                this.theProducts = Object.keys(tmp).map(key => tmp[key])
            });
    }

    editProduct(theProduct: Product){
        this.singleProduct = theProduct;
        this.formDisplay = false;
    }

    updateProduct(single: Product){
        this.productAdminService.editProduct(single);
        this.formDisplay = true;
    }

    deleteProduct(single: Product){
        let verify = confirm(`Are you sure you want to delete this product`);
        if (verify == true){
            this.productAdminService.removeProduct(single);
            this.router.navigate(['/admin/']);
        } else {
            alert('Nothing deleted');
        }
    }

    cancelEdit(){
        this.formDisplay = true;
    }

    logOut(){
        this.userService.logout();
        this.router.navigate(['']);
    }

    chooseMode(mode: string){
        this.menuChoice = mode;
    }
}