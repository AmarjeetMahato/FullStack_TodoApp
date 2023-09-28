import {NextResponse} from "next/server"
import bcrypt from "bcrypt"
import prisma from "@/libs/prismadb"



export async function POST(req:Request) {
       
      const {name ,email ,password} =  await req.json();
      try {
        if(!name || !email || !password){
            return NextResponse.json({msg:"All fields are required"})
        }

        // if Email already exist
         const user = await prisma?.user.findUnique({
                 where:{
                    email:email
                 }
         })

         if(user){
            return NextResponse.json({msg:"User already exist"}, {status:400})
         }

         const hashedPassword = await bcrypt.hash(password,10)

        //  Create New User
        await prisma?.user.create({
            data:{
                name,
                email,
                hashedPassword
            }
        })
          
        return NextResponse.json({status:200, msg:"Account created sucessfully"})
    
      } catch (error) {
        console.log(error),
        NextResponse.json(`Somthin went wrong ${error}`)
         
      }


}
