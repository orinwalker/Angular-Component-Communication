import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

    @ViewChild(CriteriaComponent) childFilterComponent: CriteriaComponent;

    pageTitle: string = 'Product List';
    parentListFilter: string;
    parentIncludeDetailBoolean: boolean = true;
    showImage: boolean = true;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    parentFilteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) {
      // this.parentListFilter = 'cart';
    }

    ngAfterViewInit(): void {
      // this.parentListFilter = 'cart';

        this.parentListFilter = this.childFilterComponent.childListFilter;
        // console.log('inside ngAfterViewInit [' + this.parentListFilter + ']');
        // console.log('this.childFilterComponent is: ' + JSON.stringify(this.childFilterComponent));
        this.productService.getProducts().subscribe(
          (products: IProduct[]) => {
              // Even though this does not log out, it is working
              // console.log('calling filter parentListFilter [' + this.parentListFilter + ']');
              this.products = products;
              // this.performFilter(this.parentListFilter);
              // here I can affect change but not if I set it through a parameter??
              this.performFilter(this.parentListFilter);
          },
          (error: any) =>  this.errorMessage  = <any>error
      );
      // console.log ('errorMessage: ' + this.errorMessage);
    }

    ngOnInit(): void {
      // this.parentListFilter = 'cart';
      // console.log('ngOnInit: parentListFilter: ' + this.parentListFilter);
      //   this.productService.getProducts().subscribe(
      //       (products: IProduct[]) => {
      //           console.log('calling filter parentListFilter ' + this.parentListFilter);
      //           this.products = products;
      //           // this.performFilter(this.parentListFilter);
      //           this.performFilter(this.orinString);
      //       },
      //       (error: any) => this.errorMessage = <any>error
      //   );
    }

    handleFilterStatusChange(childListFilter: string) {
      console.log('handleFilterStatusChange called with ' + childListFilter);
      this.performFilter(childListFilter);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {

        if (filterBy) {
          console.log('filterBy is set, performFilter - filterBy [' + filterBy + ']');
            this.parentFilteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
          console.log('filterBy is NOT set, performFilter - filterBy [' + filterBy + ']');
            this.parentFilteredProducts = this.products;
        }
    }
}
