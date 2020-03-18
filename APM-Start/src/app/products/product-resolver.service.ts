
// import { Injectable } from '@angular/core';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { Observable } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';

// // import { ProductResolved } from './product';
// import { ProductService } from './product.service';
// import { of } from 'rxjs/observable/of';
// import { IProduct } from './product';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductResolver implements Resolve<IProduct> {

//   constructor(private productService: ProductService) { }

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
//     const id = +route.paramMap.get('id');
//     return this.productService.getProduct(id);
//     // if (isNaN(+id)) {
//     //   const message = `Product id was not a number: ${id}`;
//     //   console.error(message);
//     //   return of({ product: null, error: message });
//     // }

//     // return this.productService.getProduct(+id)
//     //   .pipe(
//     //     map(product => ({ product: product })),
//     //     catchError(error => {
//     //       const message = `Retrieval error: ${error}`;
//     //       console.error(message);
//     //       return of({ product: null, error: message });
//     //     })
//     //   );
//   }

// }

// // import { Injectable } from '@angular/core';
// // import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// // import { ProductService } from './product.service';
// // import { Observable } from 'rxjs/Observable';


// // @Injectable({
// //   providedIn: 'root'
// // })

// // export class ProductResolverService implements Resolve<Product> {

// //   constructor(private productService: ProductService) { }

// //   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
// //     const id = +route.paramMap.get('id');
// //     return null;
// //   }


// // }

