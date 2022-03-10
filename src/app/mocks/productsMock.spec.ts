import { Product } from '@interfaces/Product';

export const PRODUCT_MOCK: Product = {
  id: 1,
  sku: 'FAL-8406290',
  name: 'Adidas Ultra Boost',
  brand: 'Adidas',
  size: '42',
  price: 119000,
  imageUrl: 'https://falabella.scene7.com/is/image/Falabella/8406270_1',
};

export const PRODUCTS_MOCK: Product[] = [
  {
    id: 1,
    sku: 'FAL-8406290',
    name: 'Adidas Ultra Boost',
    brand: 'Adidas',
    size: '42',
    price: 119990,
    imageUrl: 'https://falabella.scene7.com/is/image/Falabella/8406270_1',
  },
  {
    id: 2,
    sku: 'FAL-8406291',
    name: 'Nike Revolution 5',
    brand: 'Nike',
    size: '43',
    price: 89990,
    imageUrl: 'https://falabella.scene7.com/is/image/Falabella/8406270_1',
  },
  {
    id: 3,
    sku: 'FAL-8406292',
    name: 'Nike Epic React',
    brand: 'Nike',
    size: '44',
    price: 129990,
    imageUrl: 'https://falabella.scene7.com/is/image/Falabella/8406270_1',
  },
];
