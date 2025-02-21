import React from 'react'
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import { useProductStore } from '../store/product.js'
import { useEffect } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { Link } from 'react-router-dom'

const Homepage = () => {
  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  return (
    <Container maxW={'container.xl'} py={12} mt={10} border={2}>
      <VStack spacing={30}>
      <Text 
          fontSize={"30"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"} 
          fontWeight={"bold"} textTransform={"uppercase"} 
          textAlign={"center"} bgClip={"text"}
          >
          Current Products 🛒
        </Text>

       <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={10} border={2}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} /> 
        ))}
       </SimpleGrid>

        {products.length === 0 &&(
          <Text>
          no products found 😢 
          <Text color={"blue.500"} as={"span"} _hover={{textDecoration:"underline"}}>  
            <Link to={"/create"}>Create one</Link>
          </Text>
        </Text>
        )}
      </VStack>
    </Container>
  )
}

export default Homepage