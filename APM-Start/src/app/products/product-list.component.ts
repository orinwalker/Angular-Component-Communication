import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { QueryList } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    listFilter: string;

    // @ViewChild(NgModel) filterInput: NgModel;
    // @ViewChildren('filterElement, nameElement') inputElementRefs: QueryList<ElementRef>;
    // @ViewChildren(NgModel) inputElementRefs: QueryList<ElementRef>;

    @ViewChild('filterElement') filterElementRef: ElementRef;
    @ViewChild(NgModel) filterInput: NgModel;

    // private _filterInput: NgModel;
    // private _sub: Subscription;

    // get filterInput(): NgModel {
    //   return this._filterInput;
    // }

    // @ViewChild(NgModel)
    // set filterInput(value: NgModel) {
    //   this._filterInput = value;
    //   console.log(this.filterElementRef);
    //   if (this.filterInput && !this._sub) {
    //     this._sub = this.filterInput.valueChanges.subscribe(
    //       () => {
    //         this.performFilter(this.listFilter);
    //         console.log('performed the filter');
    //         }
    //       );
    //   }

    //   if (this.filterElementRef) {
    //       this.filterElementRef.nativeElement.focus();
    //     }
    //   }

    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) {
      // console.log(this.filterElementRef);
    }

    ngAfterViewInit() {
      this.filterElementRef.nativeElement.focus();
      this.filterInput.valueChanges.subscribe(() => {
        this.performFilter(this.listFilter);
      });
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    // the input string is the element value from the template
    // onFilterChange(filter: string): void {
    //   this.listFilter = filter; // now set the local property
    //   this.performFilter(this.listFilter);
    // }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
