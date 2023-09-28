

import React from 'react'
import prisma from "@/libs/prismadb"
import {AiOutlineArrowLeft} from "react-icons/ai"
import Link from 'next/link';
import Author from '@/components/Author';
import DeletePost from '@/components/DeletePost';
import UpdatePost from '@/components/UpdatePost';

async function getPost(id:any){
  const response = await prisma.post.findFirst({
    where:{
      id:id
  }, select:{
    id:true,
    title:true,
    desc:true
  }
})
 return response;
}







const page = async({params}:any) => {
  // console.log(params.id);
 
  const post = await getPost(params.id)
  // console.log(post);
  
    
  return (
    <div className='max-w-5xl mt-10 gap-5 w-full mx-auto '>

    <Link href={"/"} className='px-4 py-2 w-[100px] border rounded-md hover:bg-gray-600 hover:text-white flex items-center gap-2'><AiOutlineArrowLeft size={20} className=''/>Back</Link>
  <div className='px-8 border-2 mt-5 bg-gray-950 text-white rounded-xl  shadow-2xl '>
  <div className='mt-8 flex items-center justify-between'>
      <h2 className='font-semibold my-4 text-4xl mb-10'>{post?.title}</h2>
      <div className='space-x-4 flex items-center'>
             {/* Edit Button */}
             <UpdatePost id={params.id}/>
              {/* Edit Button */}
              <DeletePost id={params.id}/>
           
      </div>
  </div>
  <div className='flex items-center'>
  <p className='pb-5'>{post?.desc}</p>

  </div>
  <div className='flex items-center justify-end mb-4'>
     <Author/>
  </div>
 

</div>
  </div>
  )
}

export default page