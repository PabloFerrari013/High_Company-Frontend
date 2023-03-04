import { api } from '@/services/api'
import {
  Flex,
  Image,
  Heading,
  Text,
  Button,
  Spinner,
  Icon
} from '@chakra-ui/react'
import axios from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MdOutlineBrokenImage } from 'react-icons/md'
import { toast } from 'react-toastify'

interface Prod {
  id: string
  img_URL: string
  name: string
  price: number
  stock: number
}

const Product: NextPage = () => {
  const [product, setProduct] = useState<Prod>()
  const router = useRouter()

  async function handleData() {
    try {
      if (!router.query.id) return

      const { data } = await api.get<{ product: Prod }>(`${router.query.id}`)

      setProduct(JSON.parse(`${data}`)?.product)
    } catch (error: any) {
      console.log(error.message)

      if (error?.response?.status === 404) {
        return toast.error('Produto não encontrado 😕', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark'
        })
      }

      return toast.error(
        'Ocorreu um conflito interno, tente novamente mais tarde 🤯',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark'
        }
      )
    }
  }

  function handleAddProduct() {
    toast.success('Produto adicionado 😎', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    })
  }

  useEffect(() => {
    const fetch = async () => await handleData()
    fetch()
  }, [router.asPath])

  if (!product) {
    return (
      <Flex
        as="main"
        w="100%"
        h="80vh"
        justifyContent="center"
        alignItems="center"
        p="2em"
      >
        <Spinner size="lg" />
      </Flex>
    )
  }

  return (
    <>
      <Head>
        <title>HIGH Company® – if it's not HIGH, it's not hot</title>
      </Head>

      <Flex
        as="main"
        px="2em"
        mx="auto"
        maxW="1024px"
        mb="4em"
        w="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Flex direction="column" alignItems="center" w="100%">
          {product.img_URL ? (
            <Image
              src={product.img_URL}
              alt={product.name}
              h="100%"
              maxH="400px"
              objectFit="cover"
              maxW="100%"
            />
          ) : (
            <Flex
              w="50vw"
              h="25vw"
              bg="gray.50"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={MdOutlineBrokenImage}
                color="gray.800"
                fontSize="1.2em"
              />
            </Flex>
          )}

          <Heading mt="1em" as="h2" fontSize="1.5em" color="gray.800">
            {product.name}
          </Heading>

          {product.stock <= 0 ? (
            <>
              <Text
                as="p"
                fontSize="0.8em"
                color="red"
                fontStyle="italic"
                mt="0.5em"
              >
                Sold Out.
              </Text>

              <Button
                isDisabled
                mt="1.5em"
                fontSize="0.8em"
                textTransform="uppercase"
                size="lg"
              >
                comprar
              </Button>
            </>
          ) : (
            <>
              <Text as="p" fontSize="1.2em" color="gray.600" mt="0.5em">
                {(product.price / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>

              <Button
                onClick={() => handleAddProduct()}
                mt="1.5em"
                fontSize="0.8em"
                textTransform="uppercase"
                size="lg"
              >
                comprar
              </Button>
            </>
          )}

          <Link href="/">
            <Text
              mt="3em"
              fontSize="1em"
              textTransform="uppercase"
              textDecoration="underline"
            >
              Voltar para a home
            </Text>
          </Link>
        </Flex>
      </Flex>
    </>
  )
}

export default Product
