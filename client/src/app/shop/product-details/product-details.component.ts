import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity:number = 1;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private breadService: BreadcrumbService, private basketService: BasketService) {
    breadService.set('@productDetails', ' ');
   }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(product=>{
      this.product = product;
      this.breadService.set('@productDetails', product.name)
    }, error =>{
      console.log(error)
    })
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product, this.quantity)
  }

  incrementItemQuantitiy(){
    this.quantity++;
  }

  decrementItemQuantitiy(){
    if(this.quantity>1){
    this.quantity--;
    }
  }

}
