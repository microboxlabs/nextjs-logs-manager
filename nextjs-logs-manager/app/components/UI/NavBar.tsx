"use client"
import { Navbar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';


const NavBar = () => {

    const router = useRouter();
    const pathname = usePathname();


    const signOut = () => {
        Cookies.remove("auth-token")
        router.push("")
    }


  return ( 
    <Navbar className='bg-black text-white' rounded>
    <Navbar.Brand  href="/">
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Microboxlabs</span>
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <button>
      <Navbar.Link className='text-white' href="/dashboard" >
        Dashboard
      </Navbar.Link>

      </button>
      {
        pathname === '/dashboard' && (

      <button>
      <Navbar.Link className='text-white' onClick={signOut} >
        Salir
      </Navbar.Link>

      </button>
        ) 
      }
    </Navbar.Collapse>
  </Navbar>
  )
}

export default NavBar
