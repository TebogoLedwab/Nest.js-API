import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>
    ) { }

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({
            title,
            description: desc,
            price
        });
        const result = await newProduct.save();
        console.log(result)
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price
        }));
    }

    async getSingleProduct(prodId: string) {
        const product = await this.findProduct(prodId);
        return product;
    }

    updateproduct(prodId: string, title: string, desc: string, price: number) {
        // const [product, index] = this.findProduct(prodId);
        // const updateproduct = { ...product };
        // if (title) {
        //     updateproduct.title = title;
        // }
        // if (desc) {
        //     updateproduct.description = desc;
        // }
        // if (price) {
        //     updateproduct.price = price;
        // }
        //this.products[index]= updateproduct;



    }

    deleteProduct(prodId: string) {
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1)

    }

    private async findProduct(id: string): Promise<Product> {
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return product;
        // return {id: product.id, title: product.title, description: product.description, price: product.price};
    }
}