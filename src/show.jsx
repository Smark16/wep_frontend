import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import PrivateRoute from './components/PrivateRoutes'
import { AuthContext } from './Context/AuthContext'
import Pages from './components/pages'
import BasicInfo from './formpages/BasicInfo'
import BussinessInfo from './formpages/BussinessInfo'
import TradeAssociation from './formpages/TradeAssociation'
import Women from './formpages/Women'
import Logout from './components/Logout'
import Complete from './formpages/Complete'


function Show() {
    const { display } = useContext(AuthContext)
    
    return (
        <>
        <Routes>

        <Route path='/complete' element={<Complete/>}/>
        </Routes>
      <Navbar/>

      <Routes>
        {/* public routes */}
        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}/>

        {/* private Routes */}
        <Route path='/application/*'
          element={
            <PrivateRoute>
              <div className="sidebar">
                <div className={`sides ${display ? 'show' : ''}`}>
                  <Pages/>
                </div>
                <div className="routes">
                  <Routes>
                   <Route path='basic_information' element={<BasicInfo/>}/>
                   <Route path='bussiness_information' element={<BussinessInfo/>}/>
                   <Route path='trade_association' element={<TradeAssociation/>}/>
                   <Route path="women_enterprizes" element={<Women/>}/>
                   <Route path='logout' element={<Logout/>}/>
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default Show
