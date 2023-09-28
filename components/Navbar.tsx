"use client"


import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'




const Navbar = () => {
    const {data: session} = useSession()
  return (
    <div className='py-4 bg-[#1c1a1a] flex items-center justify-between px-4 md:px-[120px]'>
             
             {/* Logo */}

               <div className='text-rose-500 cursor-pointer'>
                    <h1 className='text-md font-semibold '>Todo App</h1>
               </div>

             {/* Other Stuff */}
            <div className='flex items-center space-x-4 text-white'>
                  {/* session */}
                  <div>
                         {session ? (
                              <p className='uppercase border-b-2 border-red-300'>{session.user?.name}</p>
                         ):(
                              <Button className='bg-blue-500'><Link href="/sign-in">SignIn</Link></Button>
                         )}
                  </div>

                  {/* Create  */}
                  {session && (
                             <div className='text-white'>
                             <Link href="/create"><Button  className='px-4 py-1 bg-slate-600 rounded-md hover:bg-slate-700 text-white'>Create</Button></Link>
                       </div>
                  )}
                 

                    {/* Logout  */}
                    {
                      session && (
                        <div className='text-white'>
                        <Button onClick={()=>signOut()}  className='px-4 py-1 bg-rose-500 rounded-md hover:bg-rose-700 text-white'>Logout</Button>
                        </div>
                      )
                    }
                   
            </div>
    
    </div>
  )
}

export default Navbar