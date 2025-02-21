import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoIosMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW={"1140px"}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{base:"column", sm:"row"}}>
        {/* Text logo */}
        <Text 
          bgGradient={"linear(to-r, cyan.400, blue.500)"} 
          fontSize={{base:"22", sm:"28"}} fontWeight={"bold"} textTransform={"uppercase"} 
          textAlign={"center"} bgClip={"text"}
          >
          <Link to={"/"}> Mini store</Link>
        </Text>

        {/* add products/light&dark mode buttons */}  
        <HStack>
          <Link to={"/create"}>
            <Button>
              <FaRegSquarePlus />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoSunny size={20} /> : <IoIosMoon size={20} />}
          </Button>
        </HStack>
  

      </Flex>
    </Container>
  )
}

export default Navbar