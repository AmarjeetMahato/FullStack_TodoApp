"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import Link from 'next/link'
import React,{useState} from 'react'

interface Props {
  title :string,
  desc  : string
}



const intialValue: Props = {
  title :"",
  desc  : ""

}





const UpdatePage = ({params}:any) => {
    const {id} = params;
    console.log('id',id);
    
   
  const [updatePost, setUpdatePost] = useState(intialValue)
  const [loading, setLoading] = useState<boolean>(false)


   const UpdatePost = async(e:React.MouseEvent<HTMLElement>)=> {
                  e.preventDefault()
                  setLoading(true)
                  try {
                    await axios.patch(`/api/auth/post/${id}`,{...updatePost})
                    .then((res)=>{
                         if(res.data){
                          console.log(res.data)
                         }
                         setLoading(false)
                         
                    }) 
                    .catch((error)=>{
                      console.log(error)
                    })
                  } catch (error) {
                      console.log(error);
                      
                  }
               
                  setLoading(false)
             
   }




  return (
    <div className=''>
            <div className='mt-5'>
                      {/* Home Page Button */}
                      <Link href={"/"} className='md:ml-[180px] ml:[10px] '>
                        <Button className='bg-white text-black shadow-lg px-8 hover:text-white border-2'>Home</Button>
                        </Link>
                     
                     <div className='flex px-5 md:max-w-2xl w-full mx-auto items-center gap-5 justify-center flex-col'>
                           

                        <h1 className='text-2xl font-semibold uppercase mt-4'>Update your Posts</h1>
                        {/* Title */}
                        <Label className="flex justify-start w-full text-xl font-semibold ">Title</Label>
                        <Input placeholder='Title' id='title'disabled={loading} name='title' value={updatePost.title}
                        onChange={(e)=>setUpdatePost({...updatePost, title:e.target.value})}
                        />

                        {/* Description */}
                        <Label className='flex justify-start w-full font-semibold text-xl'>Description</Label>
                        <Input placeholder='Description' disabled={loading}  id='title' name='title'
                        value={updatePost.desc}
                        onChange={(e)=>setUpdatePost({...updatePost, desc:e.target.value})}
                       />
                        <Button onClick={UpdatePost} className='w-full'>Update</Button>
                     </div>

            </div>
    </div>
  )
}

export default UpdatePage