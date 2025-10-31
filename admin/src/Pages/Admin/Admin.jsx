import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'

const Admin = () => {
  return (
    <div className='admin'>
    <Sidebar />
    <Routes>
      <Route path='/' element={<AddProduct />} />
      <Route path='/add-product' element={<AddProduct />} />
      <Route path='/list-product' element={<ListProduct />} />
      <Route path='*' element={<AddProduct />} />
    </Routes>
    </div>
  )
}

export default Admin