import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { QueryList } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    // listFilter: string;

    private _listFilter: string;

    @ViewChild('filterElement') filterElementRef;
    // @ViewChildren('filterElement, nameElement') inputElementRefs: QueryList<ElementRef>;
    // @ViewChildren(NgModel) inputElementRefs: QueryList<ElementRef>;

    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.performFilter(this._listFilter);
    }

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
      // console.log(this.inputElementRefs);
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
