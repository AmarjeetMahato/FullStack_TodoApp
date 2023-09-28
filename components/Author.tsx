"use client"

import React from 'react'
import { useSession } from 'next-auth/react'

const Author = () => {
    const {data:session} = useSession();
    console.log(session);
    
  return (
    <div className=''>
        {session && (
            <p>Author : <span className='px-4 py-1 rounded-full bg-white text-gray-950 uppercase font-medium'>{session.user?.name}</span></p>
        )}
    </div>
  )
}

export default Author