
import { BrowserRouter, Route, Routes } from 'react-router'
import ProductDetail from '../features/product/pages/ProductDetail'
import ProductPage from '../features/product/pages/ProductPage'

function AppRoutes() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/:category' element={<ProductPage/>}></Route>
    <Route path='/:category/:id' element={<ProductDetail/>}></Route>
    <Route path='/search' element={<ProductPage/>}></Route>
   
   </Routes>
   </BrowserRouter>
  )
}

export default AppRoutes