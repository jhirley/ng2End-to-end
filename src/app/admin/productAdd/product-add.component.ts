import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductAdminService } from '../adminShared/product-admin.service';
import { Product } from '../adminShared/product';

@Component({
    selector: 'add-product',
    templateUrl: './product-add.component.html'
})
export class ProductAddComponent {

    imgTitle: string;
    imageSRC: string;
    productName: string;
    description: string;
    price: number;
    product: Product;

    constructor( private productAdminService: ProductAdminService, private router: Router) {} 

    fileLoad($event: any) {
        let myReader:FileReader = new FileReader();
        let file: File = $event.target.files[0];
        this.imgTitle = file.name;
        myReader.readAsDataURL(file);

        myReader.onload = (e: any) => {
            this.imageSRC = e.target.result;
        }

    }

    createProduct(){
        this.product = new Product ( 
            this.productName, 
            this.description,
            this.price,
            this.imgTitle, 
            this.imageSRC.substring(this.imageSRC.indexOf(',')+1)
        );
        console.log('product-add.component : we get to create post');
        
        this.productAdminService.createProduct(this.product);
        console.log('product-add.component : we get past create post');
        alert(`${this.productName} added to posts`);
        this.router.navigate(['/admin']);
    }  

    cancel(){
        this.router.navigate(['/admin']);
    }
}