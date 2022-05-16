import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from './account/account-service.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SkiNet';

  constructor(private basketService: BasketService, private accountService: AccountServiceService){

  }

  ngOnInit(): void {
   this.loadBasket();
   this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');
    
    this.accountService.loadCurrentUser(token).subscribe(()=>{
      console.log("Loaded User");
    }, error =>{
      console.log(error);
    })
   
  }

  loadBasket(){
    const basketId  = localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(()=>{
        console.log("Init Basket")
      }, error=>{
        console.log(error)
      })
    }
  }
}
