"use client"

import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'






const ReadMore = ({id}:any) => {
    const {data: session} = useSession()
  return (
    <div>
        {session && <Link href={`/post/${id}`}>
            <Button className='bg-blue-500'>Read More...</Button>
          </Link>}
    </div>
  )
}

export default ReadMore