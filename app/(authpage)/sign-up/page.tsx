"use client"

import AuthNav from '@/components/AuthNav'
import axios from "axios"
import React,{useState} from 'react'
import Link from "next/link"
import Image from 'next/image'
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface initialProps{
    name:string,
    email:string,
    password:string
}

const initialState:initialProps = {
    name:"",
    email:"",
    password:""
}


const SignUp = () => {
     const router = useRouter()
    const [auth, setAuth] = useState(initialState)
    const [loading,setLoading] = useState<boolean>(false)


    const formSubmit =  (e:any)=>{
        e.preventDefault()
        setLoading(true)
        axios.post("/api/auth/signup",auth)
        .then((res)=>{
            console.log(res);
            alert("User has been created") 
            router.push('/api/auth/signin')  
        })
        .catch((error)=>{
            console.log(error);
            alert(error)
            
        })
        setLoading(false)
    }


  return (
    <div className='h-screen'>
    <AuthNav/>
  <div className='grid grid-cols-1  lg:grid-cols-2'>

       <div className='hidden lg:block'>
            <Image src="/image.jpg" alt=""  width={100} height={100} className='h-screen w-full object-cover'/>
       </div>

       <div className='flex justify-center items-center mt-20 lg:mt-0'>
                  <div className='px-10 lg:px-32 w-full gap-10'>
                     <h1 className='text-5xl font-bold'>DevUI</h1>
                     <p className=' font-md'>Find world's best ui here</p>
                      <div className='mt-4 '>
                        {/* Name */}
                      <Label htmlFor="name" className='text-md '>Name</Label>
                       <Input disabled={loading} className='mb-4' placeholder='enter your name' id='name' name='name' type='name' 
                       value={auth.name}
                       onChange={(e)=>setAuth({...auth, name:e.target.value})} />
                            {/* Email */}
                      <Label htmlFor="email" className='text-md '>Email</Label>
                       <Input disabled={loading}  className='mb-4' placeholder='enter your email' id='email' name='email' type='email' 
                         value={auth.email}
                         onChange={(e)=>setAuth({...auth, email:e.target.value})}/>
                         {/* Password */}
                       <Label htmlFor="email" className='text-md '>Password</Label>
                       <Input disabled={loading}  className='mb-4' placeholder='enter your password' id='password' name='password' type='password' 
                         value={auth.password}
                         onChange={(e)=>setAuth({...auth, password:e.target.value})}/>
                    
                      </div>
                      <div className='mt-4'>

                      <Button onClick={formSubmit} className='w-full'>SignUp</Button>
                      </div>

                      <div className='mt-2'>
                          <h1 className='font-semibold'>Already have an account? <Link href="/sign-in" className='text-yellow-500'>SignIn</Link></h1>
                           
                      </div>
                  
                  </div>
       </div>
  </div>
</div>
  )
}

export default SignUp