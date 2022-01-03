import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
@Controller('product')
export class ProductController {

  constructor(private productService: ProductService) { }

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO)
    return res.status(HttpStatus.CREATED).json(product)
  }
  @Get('/')
  async getProducts(@Res() res) {
    try {
      const products = await this.productService.getProducts()
      return res.status(HttpStatus.OK).json(products);

    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
  @Get('/:productId')
  async getProduct(@Res() res, @Param('productId') productId: string) {
    const product = await this.productService.getProduct(productId);
    if (!product) throw new NotFoundException('Producto no existe por id')
    return res.status(HttpStatus.OK).json(product);
  }
  @Delete('/:productId')
  async deleteProduct(@Res() res, @Param('productId') productId: string) {
    const deletedProduct = await this.productService.deleteProduct(productId);
    if (!deletedProduct) throw new NotFoundException("Producto no existe")
    return res.status(HttpStatus.OK).json({
      message: 'Producto Eliminado Correctamente',
      deletedProduct
    });
  }
  @Put('/:productId')
  async updateProduct(@Res() res, @Param('productId') productId: string, @Body() createProductDTO: CreateProductDTO) {
    const productUpdated = await this.productService.updateProduct(productId, createProductDTO);
    if (!productUpdated) throw new NotFoundException("Producto no existe");
    return res.status(HttpStatus.OK).json({
      message: "Producto Actualizado",
      productUpdated
    })
  }
}
