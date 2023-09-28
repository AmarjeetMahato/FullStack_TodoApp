"use client"

import React from 'react'
import { Button } from './ui/button'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface Props{
 id: string
}



const DeletePost = ({id}:Props) => {
        const {data: session} = useSession();
      const router = useRouter()
    const DeletePost = async(e:React.MouseEvent<HTMLElement>)=>{
          e.preventDefault()
        const confirmed = confirm('Are you sure?');

        if(confirmed){
            axios.delete(`/api/auth/post/${id}`)
            .then((res)=>{
             console.log(res);
              router.push('/')
            })
            .catch((error)=>{
             console.log(error)
            })
        }

    }



  return (
    <div>
        {session && (
             <Button onClick={DeletePost} className='bg-red-500'><MdDelete className='w-[12px] md:w-[20px]'/></Button>
        )}
         
    </div>
  )
}

export default DeletePost