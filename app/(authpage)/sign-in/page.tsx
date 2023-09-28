"use client"

import AuthNav from '@/components/AuthNav'
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


interface initialProps{
    email:string,
    password:string
}

const initialState:initialProps = {
    email:"",
    password:""
}


const SignIn = () => {
    
  const { status } = useSession();
    const router = useRouter()
    const [auth, setAuth] = useState(initialState);

  

    const formSubmit = async(e:any) => {
          e.preventDefault()
          
          try {
            
          await signIn('credentials',{
            ...auth,//redirect:false
          })
          // router.push('/');
          } catch (error) {
              console.log(error);
              
          }
    }

    useEffect(() => {
      if (status === 'authenticated') {
         router.refresh()
         router.push('/') 
      }
  },[status])

    
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
                            <Label htmlFor="email" className='text-md '>Email</Label>
                             <Input className='mb-4' placeholder='enter your email' id='email' name='email' type='email' 
                             value={auth.email}
                             onChange={(e)=>setAuth({...auth, email:e.target.value})}/>
                             <Label htmlFor="email" className='text-md '>Password</Label>
                             <Input className='mb-4' placeholder='enter your password' id='password' name='password' type='password'  value={auth.password}
                         onChange={(e)=>setAuth({...auth, password:e.target.value})}/>
                             
                            </div>
                            <div className='mt-4'>

                            <Button className='w-full' onClick={formSubmit}>SignIn</Button>
                            </div>

                            <div className='mt-2'>
                          <h1 className='font-semibold'>Don't  have an account? <Link href="/sign-up" className='text-yellow-500'>SignUp</Link></h1>
                           
                      </div>
                  
                        
                        </div>
             </div>
        </div>
    </div>
  )
}

export default SignIn