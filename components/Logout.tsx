"use client"

import React from 'react'
import { signOut, useSession } from 'next-auth/react'


const Logout = () => {
    const {data: session} = useSession()
  return (
    <div >
            <button onClick={()=>signOut()} className="px-4 py-2 bg-red-500">Logout</button> 
    </div>
  )
}

export default Logout