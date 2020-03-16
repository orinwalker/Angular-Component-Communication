import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { timer } from 'rxjs/observable/timer';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';
    product: IProduct | null;
    sub: Subscription;

    // get product(): IProduct | null {
    //   // whenever the template asks for the current product,
    //   // go get it from the service (it has the current copy)
    //   // return this.productService.currentProduct;
    // }

    constructor(private productService: ProductService) { }

    ngOnInit() {
      // console.log(this.productXXXXXXXXXX);
      // timer(0, 1000).subscribe(t => console.log(this.productXXXXXXXXXX));
      this.sub = this.productService.selectedProductChanges$.subscribe(
        selectedProduct => this.product = selectedProduct
      );
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

}
