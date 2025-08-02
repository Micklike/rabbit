import React, { useState } from 'react';
import { Link } from 'react-router';
import {HiOutlineUser,HiOutlineShoppingBag,HiBars3BottomRight} from "react-icons/hi2"
import Searchbar from './searchbar';
import Cartdrawer from '../LAYOUT/cartdrawer';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
const Navbar = ({text,settext}) => {
    const [iscartopen,setiscartopen]=useState("")
    const [navdraweropen,setnavdraweropen]=useState(false)
    const {cart}=useSelector(state=>state.cart)
    const cartitemcount=cart?.products?.reduce((a,i)=>a+i.quantity,0)
    const {user}=useSelector(state=>state.auth)
    const handlenavtoggle=()=>{
        setnavdraweropen(!navdraweropen)
    }
    const handlecarttoggle=()=>{
        setiscartopen(!iscartopen)
    }
    return (
        <>
        <nav className=' container mx-auto flex items-center justify-between py-4 px-5'>
            <div>
                <Link to="/" className='text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text 
               bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 
               drop-shadow-lg tracking-wide'>
                Shop4U
                </Link>
            </div>
              <div className='hidden md:flex gap-4'>
          <Link to="/collections?gender=men" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Men</Link>
          <Link to="/collections?gender=women" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Women</Link>
          <Link to={`/collections?category=${encodeURIComponent("Top wear")}`} className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Top Wear</Link>
          <Link to={`/collections?category=${encodeURIComponent("Bottom wear")}`} className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Bottom Wear</Link>
      

      
        </div>

            {/* right icons */}
            <div className='flex items-center space-x-4'>
                {user?.role=='admin'&&
                <Link to="/admin" className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>}
                <Link to="/profile" className='hover:text-black '>
                <HiOutlineUser className="h-6 w-6t text-gray-700"></HiOutlineUser></Link>
                <button className='relative hover:text-black'>
                    <HiOutlineShoppingBag className='h-6 w-6 text-gray-700 cursor-pointer' onClick={()=>setiscartopen(true)}></HiOutlineShoppingBag>
                   

{cartitemcount>0?                    <span className=' -top-1 absolute rrr text-white text-xs rounded-full px-2 py-0.5'>
    {cartitemcount}
                    </span>:""}

                </button>
                <Searchbar ></Searchbar>
                {/* search */}
                <button onClick={handlenavtoggle} className='md:hidden'>
                    <HiBars3BottomRight className='h-6 w-6 text-gray-700 lg:hidden md:block'/>
                </button>
            </div>
            

        </nav>
        <Cartdrawer iscartopen={iscartopen} handlecarttoggle={handlecarttoggle}></Cartdrawer>
        {/* mobile navigation */}
        <div className={`fixed top-0 left-0 w-3/4 sm:w-1/3 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navdraweropen?"translate-x-0":"-translate-x-full"} `}>
        <div className='flex justify-end p-4'>
            <button onClick={handlenavtoggle} >
                <IoMdClose className='h-6 w-6 text-gray-600'></IoMdClose>
            </button>

        </div>
        <div className='p-4'>
            <h2 className='text-xl font-semibold mb-4'>Menu</h2>
            <nav className='space-y-4'>
                <Link to="/collections?gender=men" onClick={handlenavtoggle} className='block text-gray-600 hover:text-black'>
                Men</Link>
                 <Link to="/collections?gender=women" onClick={handlenavtoggle} className='block text-gray-600 hover:text-black'>
                Women</Link>
                 <Link to={`/collections?category=${encodeURIComponent("Top wear")}`} onClick={handlenavtoggle} className='block text-gray-600 hover:text-black'>
                Top Wear</Link>
                 <Link to={`/collections?category=${encodeURIComponent("Bottom wear")}`} onClick={handlenavtoggle} className='block text-gray-600 hover:text-black'>
                Bottom Wear</Link>
            </nav>
        </div>
        </div>
        </>
    );
}

export default Navbar;
