import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from './products.model';

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number){
        const prodId = Math.random().toString();
        const newProduct =  new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(prodId: string){
      const product =  this.findProduct(prodId)[0];
        return {...product};
    }

    updateproduct(prodId: string, title: string, desc: string, price: number)    {
        const [product, index] =  this.findProduct(prodId);
        const updateproduct = {...product};
        if(title) {
            updateproduct.title = title;
        }
        if(desc) {
            updateproduct.description = desc;
        }
        if(price) {
            updateproduct.price = price;
        }
        this.products[index ]= updateproduct;

       

    }

    private findProduct(id: string): [Product, number]{
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if(!product) {
            throw new NotFoundException('Could not find product');
        }
        return [product, productIndex];
    }
}