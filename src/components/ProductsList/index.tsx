import { Flex, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import Product from '../Product'

interface Product {
  id: string
  img_URL: string
  name: string
  price: number
  stock: number
}

interface ProductListProps {
  products: Product[]
}

const ProductsList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing="2em">
      {products.map(product => (
        <Product
          key={product.id}
          id={product.id}
          img_URL={product.img_URL}
          name={product.name}
          price={product.price}
          stock={product.stock}
        />
      ))}
    </SimpleGrid>
  )
}

export default ProductsList
