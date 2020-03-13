import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewInit {

    @ViewChild(CriteriaComponent) childFilterComponent: CriteriaComponent;

    listFilter: string;
    errorMessage: string;
    pageTitle: string = 'Product List';
    includeDetail: boolean = true;
    showImage: boolean = true;
    imageWidth: number = 50;
    imageMargin: number = 2;
    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) {
    }

    ngAfterViewInit(): void {
        this.listFilter = this.childFilterComponent.listFilter;
        this.productService.getProducts().subscribe(
          (products: IProduct[]) => {
              this.products = products;
              this.performFilter(this.listFilter);
          },
          (error: any) =>  this.errorMessage  = <any>error
      );
    }

    handleFilterChange(listFilter: string) {
      this.performFilter(listFilter);
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
