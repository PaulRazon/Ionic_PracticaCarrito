import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';
import { elementAt } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public totalPrice= 0;
  public contador =0;
  public products:Product[] = [];
  public productsFounds: Product[]=[];
  public shoppingCart:Cart[]=[]
  public filter=[
    "Abarrotes",
    "Frutas y Verduras",
    "Limpieza",
    "Farmacia"
  ];

  constructor() {
    this.products.push({
      name: "Coca Cola",
      price:20,
      description:"Es una cocacola",
      type:"Abarrotes",
      photo:"https://picsum.photos/200/300?random=2"
    });

    this.products.push({
      name: "Jabon Zote",
      price:70,
      description:"Es bueno para bañarte",
      type:"Limpieza",
      photo:"https://picsum.photos/200/300?random=1"
    });

    this.products.push({
      name: "Manzana",
      price:10,
      description:"Es una fruta",
      type:"Frutas_y_Verduras",
      photo:"https://picsum.photos/200/300?random=3"
    });

    this.products.push({
      name: "Pastillas",
      price:30,
      description:"Escaldan el paladar",
      type:"Farmacia",
      photo:"https://picsum.photos/200/300?random=4"
    });
    this.productsFounds = this.products;
  }
  public filterProducts():void{
    console.log(this.filter)
    this.productsFounds = this.products.filter(item=>{
      return this.filter.includes(item.type);
    });
  }
  public acumularProduct(product:Product){

    const copia = this.shoppingCart.findIndex(element =>element.product.name === product.name);
    const aumenta = this.shoppingCart[copia];
      aumenta.amount++;
      aumenta.subtotal =aumenta.amount * aumenta.product.price; 
      this.calculatePrice();
  }
  public addCart(product:Product){
    console.log(this.shoppingCart.findIndex(element => element.product.name === product.name))
    if((this.shoppingCart.findIndex(element => element.product.name === product.name)===-1)){
      this.shoppingCart.push({
        product: product,
        amount:1,
        subtotal:product.price
      });
    }else{
      this.acumularProduct(product);
      
    }
    this.calculatePrice();
    
    
    
  }


  //remover productos
  public deleteToCart(product: Product) {
    const productoIndex = this.shoppingCart.findIndex(item => item.product.name === product.name);
  
    if (productoIndex !== -1) {
      const removedProduct = this.shoppingCart[productoIndex];
  
      if (removedProduct.amount > 1) {
        // Si hay más de un producto del mismo tipo en el carrito, simplemente disminuye la cantidad
        removedProduct.amount--;
        removedProduct.subtotal -= removedProduct.product.price;
      } else {
        // Si solo hay un producto, elimínalo del carrito
        this.shoppingCart.splice(productoIndex, 1);
      }
  
      // Actualiza el precio total
      this.calculatePrice();
    }
  
    this.contador--;
  }

  public calculatePrice(){
     this.totalPrice=0;
     this.shoppingCart.forEach(element =>{
      this.totalPrice += element.subtotal;
     });
  }

}
