import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { ErrorComponent } from '../error/error.component';
import { BlogDetailComponent } from '../blogDetails/blog-detail.component';
// import { TruncatePipe } from '../admin/adminShared/trunc.pipe';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'post/:id' , component: BlogDetailComponent},
            { path: '' , component: HomeComponent},
            { path: '**' , component: ErrorComponent }
        ])    
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        BlogDetailComponent
        // ,TruncatePipe
    ]
        
})
export class AppRoutingModule {}

