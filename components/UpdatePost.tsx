'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import {MdModeEditOutline} from "react-icons/md";

interface Props{
    id:string
}

const UpdatePost = ({id}:Props) => {
      const {data: session} = useSession()
  return (
    <div>
            {session && <Link href={`/edit/${id}`}  ><Button className='bg-green-500'><MdModeEditOutline className='w-[12px] md:w-[20px]' /></Button></Link>}
    </div>
  )
}

export default UpdatePost