import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogAdminService } from '../adminShared/blog-admin.service';
import { Blog } from '../adminShared/blog';

@Component({
    selector: 'add-menu',
    templateUrl: './blog-add.component.html'
})
export class BlogAddComponent {

    imgTitle: string;
    imageSRC: string;
    postTitle: string;
    content: string;
    post: Blog;

    constructor( private blogAdminService: BlogAdminService, private router: Router) {} 

    fileLoad($event: any) {
        let myReader:FileReader = new FileReader();
        let file: File = $event.target.files[0];
        this.imgTitle = file.name;
        myReader.readAsDataURL(file);

        myReader.onload = (e: any) => {
            this.imageSRC = e.target.result;
        }

    }

    createPost(){
        this.post = new Blog ( 
            this.postTitle, 
            this.content, 
            this.imgTitle, 
            this.imageSRC.substring(this.imageSRC.indexOf(',')+1)
        );
        console.log('blog-add.component : we get to create post');
        
        this.blogAdminService.createPost(this.post);
        console.log('blog-add.component : we get past create post');
        alert(`${this.postTitle} added to posts`);
        this.router.navigate(['/admin']);
    }  

    cancel(){
        this.router.navigate(['/admin']);
    }
}