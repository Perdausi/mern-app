import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product.js'

const Createproduct = () => {
  const [newProduct, setNewProduct] = useState(
    {
      name: "",
      price: "",
      image: ""
    }
  )

  const {createProduct} = useProductStore();
  const toast = useToast()
  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    if (!success) {
      toast({
          title: 'Error',
          description: message,
          status: 'error',
          isClosable: true,
        });
    }else{
      toast({
          title: 'Product Added.',
          description: message,
          status: 'success',
          isClosable: true,
        });
    }
    setNewProduct({"name": "", "price": "", "image": ""});
  }
  return ( 
      <Container maxW={"container.sm"} h={"100vh"} >
        <VStack spacing={8} align={"center"} justifyContent={"center"}> 
            <Heading as={'h1'} size={"2xl"} textAlign={"center"} mb={"8"}>Create new products</Heading>

          {/* FORM BOX */}
          <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={"6"} rounded={"lg"} shadow={"md"} mb={8}>
            <VStack spacing={4}>
              <Input 
                placeholder='Product Name'
                name='name'
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />

              <Input 
                placeholder='Price'
                name='price'
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              />

              <Input 
                placeholder='Image URL'
                name='imageURL'
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              />

              <Button onClick={handleAddProduct}
                w={"full"}
                colorScheme='blue'
              >
                Add Product
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
  )
}

export default Createproduct