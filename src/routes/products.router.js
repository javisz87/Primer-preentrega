import { Router } from 'express';
import __dirname from '../utils.js';
import ProductManager from '../ProductManager.js';
import path from 'path';

const router = Router();


const productManager = new ProductManager(
  path.join(__dirname, 'productos.json')
);


router.get('/', async (req, res) => {
  const products = await productManager.getProducts();

  const { limit } = req.query; 
  if (limit) {
    const productsFiltered = products.slice(0, limit); 
    res.send(productsFiltered);
    return;
  }
  res.send(products);
});



router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(pid);
  res.send(product);
});



router.post('/', async (req, res) => {
  const { body } = req;
  const id = await productManager.addProduct(body);
  res.json(id);
});



router.put('/:pid', async (req, res) => {
  const { body } = req;
  const { pid } = req.params;

  const id = await productManager.updateProduct(pid, body);
  res.json(id);
});



router.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.deleteProductById(pid);
  res.json(product);
});

export default router;
