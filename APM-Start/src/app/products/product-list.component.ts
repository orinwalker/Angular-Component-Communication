import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewInit, OnInit {

    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

    listFilter: string;
    errorMessage: string;
    pageTitle: string = 'Product List';
    includeDetail: boolean = true;

    imageWidth: number = 50;
    imageMargin: number = 2;
    filteredProducts: IProduct[];
    products: IProduct[];

    get showImage(): boolean {
      return this.productParameterService.showImage;
    }
    set showImage(value: boolean) {
      this.productParameterService.showImage = value;
    }

    constructor(private productService: ProductService,
      private productParameterService: ProductParameterService) {
    }

    ngAfterViewInit(): void {
        this.listFilter = this.filterComponent.listFilter;
    }

    ngOnInit() {
      this.productService.getProducts().subscribe(
        (products: IProduct[]) => {
            this.products = products;
            this.filterComponent.listFilter = this.productParameterService.filterBy;
        },
        (error: any) =>  this.errorMessage  = <any>error
    );
    }

    handleFilterChange(value: string) {
      this.productParameterService.filterBy = value;
      this.performFilter(value);
    }

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
