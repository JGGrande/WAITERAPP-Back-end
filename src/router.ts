import path from 'node:path';

import { Router } from 'express';

import multer from 'multer';

//importando metodos locais
import { createCategoty } from './app/useCases/categoties/createCategory';
import { listCategories } from './app/useCases/categoties/listCategories';
import { createProduct } from './app/useCases/products/createProduct';
import { listProducts } from './app/useCases/products/listProducts';
import { listProductsByCategories } from './app/useCases/categoties/listProductsByCategories';
import { listOrder } from './app/useCases/orders/listOrder';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  })
});

//listar as categorias
router.get('/categories', listCategories);

//criar uma categoria
router.post('/categories', createCategoty);

//listar os produtos
router.get('/products', listProducts);

//criar produto
router.post('/products', upload.single('image'), createProduct);

//pegar produtos pela categoria
router.get('/categories/:categoryId/products', listProductsByCategories);

//listar pedidos
router.get('/orders', listOrder);

//criar pedido
router.post('/orders', createOrder);

//mudar status do pedido
router.patch('/orders/:orderId', changeOrderStatus);

//deletar/ cancelar produto
router.delete('/orders/:orderId', cancelOrder);
