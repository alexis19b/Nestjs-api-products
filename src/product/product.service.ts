import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly ProductModel: Model<Product>) { }

  async getProducts(): Promise<Product[]> {
    const products = await this.ProductModel.find()
    return products;
  }

  async getProduct(productId: string): Promise<Product> {
    const product = await this.ProductModel.findById(productId)
    return product;
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const newProduct = new this.ProductModel(createProductDTO)
    return await newProduct.save();
  }


  async deleteProduct(productId: string): Promise<Product> {
    const deletedProduct = await this.ProductModel.findByIdAndDelete(productId);
    return deletedProduct;
  }
  async updateProduct(productId: string, createProductDTO: CreateProductDTO): Promise<Product> {
    const updatedProduct = await this.ProductModel.findByIdAndUpdate(
      productId, createProductDTO, { new: true }
    );
    return updatedProduct;
  }
}
