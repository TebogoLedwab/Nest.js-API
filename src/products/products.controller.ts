import { Controller , Post, Get, Body, Param, Patch, Delete} from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService){}
    
    //adding a new product
    @Post()
    async addProduct(
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number
        ) {
       const generatedId = await this.productsService.insertProduct(
           prodTitle, 
           prodDesc, 
           prodPrice
           );
        return {id: generatedId}
    }

    //getting all existing products
    @Get()
    async getAllProducts() {
       const products = await this.productsService.getProducts();
       return products;
    }

    //getting a single product
    @Get(':id') 
    getProduct(@Param('id') prodId: string){
        return this.productsService.getSingleProduct(prodId);
    }

    //updating a product
    @Patch(':id')
    updateProducts(
    @Param('id') prodId: string,  
    @Body('title') prodTitle: string, 
    @Body('description') prodDesc: string, 
    @Body('price') prodPrice: number){
        this.productsService.updateproduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    //deleting a product
    @Delete(':id')
    deleteProduct( @Param('id') prodId: string){
        this.productsService.deleteProduct(prodId);
        return null;
    }
}