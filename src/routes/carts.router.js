import { Router } from 'express';
import __dirname from '../utils.js';
import ProductManager from '../ProductManager.js';
import CartsManager from '../CartsManager.js';
import path from 'path';

const router = Router();


const cartsManager = new CartsManager(path.join(__dirname, 'carrito.json'));
const productManager = new ProductManager(
  path.join(__dirname, 'productos.json')
);



router.post('/', async (req, res) => {
  const id = await cartsManager.createCart();
  res.json(id);
});



router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsManager.getCartById(cid);
  console.log(cart);
  res.json(cart);
});



router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const product = await productManager.getProductById(pid);
  if (product.id) {
    const cart = await cartsManager.addProductToCart(cid, pid);
    res.json(cart);
    return;
  }
  res.json({ msg: `El producto con el id ${pid} no existe.` });
});

export default router;
