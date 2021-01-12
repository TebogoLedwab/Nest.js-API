import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>
        ){}

  async insertProduct(title: string, desc: string, price: number){
        const newProduct =  new this.productModel({
            title, 
            description: desc, 
            price 
        });
      const result = await newProduct.save();
      console.log(result)
        return result.id as string;
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
        //this.products[index]= updateproduct;

       

    }

    deleteProduct(prodId: string){
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1)

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