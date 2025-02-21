import { Box, Heading, Text, Image, HStack, Button, useColorModeValue, useToast, Input, VStack, useDisclosure, ModalFooter } from '@chakra-ui/react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useProductStore } from '../store/product';
import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';

import React from 'react'

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.700");

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const handleDelete = async (pid) => {
        const {success, message} = await deleteProduct(pid)
        if(!success){
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                isClosable: true,
              });
        }else{
            toast({
                title: 'Success.',
                description: message,
                status: 'success',
                isClosable: true,
              });
        }
    }

    const handleEdit = async (pid, updatedProduct) => {
        const {success,message} = await updateProduct(pid, updatedProduct);
        onClose();  
        if(!success){
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                isClosable: true,
              }); 
        }else{
            toast({
                title: 'success',
                description: "Product updated successfully",
                status: 'success',
                isClosable: true,
              });
            }
};
  return (
    <Box
        shadow="lg"
        rounded={"lg"}
        overflow={"hidden"}
        transition = "all 0.3s"
        _hover={{transform: "translateY(-5px)", shadow: "xl"}}
        cursor={"pointer"}
        bg={bg}
    >
        <Image src={product.image} alt={product.name} h={'sm'} w={'lg'} objectFit={'cover'} />
        <Box p={4}> 
            <Heading as={'h3'} size={'md'} mb={2}>{product.name}</Heading>

            <Text fontweight={'bold'} fontSize={'xl'} mb={4} color={textColor}>${product.price}</Text>
        <HStack spacing={2}>
            <Button colorScheme={'blue'} onClick={onOpen}><CiEdit /></Button>
            <Button colorScheme={'red'} onClick={() => handleDelete (product._id)}><MdDelete /></Button>
        </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack spacing={4}>
                    <Input placeholder="Product Name" name='name'value={updatedProduct.name}
                     onChange={(e) => setUpdatedProduct ({...updateProduct, name: e.target.value})}/>
                    <Input placeholder="Price" name='price' type='number' value={updatedProduct.price}
                    onChange={(e) => setUpdatedProduct ({...updateProduct, price: e.target.value})}/>
                    <Input placeholder="Image URL" name='image' value={updatedProduct.image}
                    onChange={(e) => setUpdatedProduct ({...updateProduct, image: e.target.value})}/> 
                </VStack>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => handleEdit(product._id, updatedProduct)}>
                    Update
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </Box>
    
  )
}

export default ProductCard