import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { MdOutlineBrokenImage } from 'react-icons/md'

interface ProductProps {
  id: string
  img_URL: string
  name: string
  price: number
  stock: number
}

const Product: React.FC<ProductProps> = ({
  id,
  img_URL,
  name,
  price,
  stock
}) => {
  return (
    <Link href={`/product/${id}`}>
      <Flex w="100%" flexShrink={0} direction="column" h="100%">
        {img_URL ? (
          <Image
            w="100%"
            objectFit="cover"
            bg="gray.50"
            src={img_URL}
            alt={name}
          />
        ) : (
          <Flex
            w="100%"
            h="100%"
            bg="gray.50"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={MdOutlineBrokenImage} color="gray.800" fontSize="1.2em" />
          </Flex>
        )}

        <Text as="strong" fontSize="1.2em" color="gry.800" mt="0.5em">
          {name}
        </Text>

        {stock <= 0 ? (
          <Text
            as="p"
            fontSize="0.8em"
            color="red"
            fontStyle="italic"
            mt="0.2em"
          >
            Sold Out.
          </Text>
        ) : (
          <Text as="p" fontSize="1em" color="gray.600" mt="0.2em">
            {(price / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </Text>
        )}
      </Flex>
    </Link>
  )
}

export default Product
