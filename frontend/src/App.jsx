import {Box, useColorModeValue } from "@chakra-ui/react"
import {Route, Routes} from "react-router-dom"
import Homepage from "./pages/Homepage"
import Createproduct from "./pages/Createproduct"
import Navbar from "./components/Navbar"
function App() {

  return (  
      <Box bg={useColorModeValue("gray.100", "gray.800")} h="100%">
       <Navbar />
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/create' element={<Createproduct />} />
        </Routes>
      </Box>
  )
}

export default App
