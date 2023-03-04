import ProductsList from '@/components/ProductsList'
import { api } from '@/services/api'
import { Flex, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface Product {
  id: string
  img_URL: string
  name: string
  price: number
  stock: number
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([])

  async function handleData() {
    try {
      const { data } = await api.get<{ products: Product[] }>(
        'http://54.233.228.109:3333/xpto/products'
      )

      console.log({ data })

      setProducts(JSON.parse(`${data}`)?.products)
    } catch (error: any) {
      console.log(error.message)

      toast.error(
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

  useEffect(() => {
    handleData()
  }, [])

  if (!products || products.length === 0) {
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

      <Flex as="main" px="2em" mx="auto" maxW="1024px" mb="4em" w="100%">
        <ProductsList products={products} />
      </Flex>
    </>
  )
}

export default Home
