import prisma from "@/libs/prismadb"
import {NextResponse} from "next/server"
import {ServerSession}   from "@/components/ServerSession"




export async function GET(req:NextResponse){
   
    try {
           const posts = await prisma.post.findMany();
           console.log(posts);
           
           return NextResponse.json(posts,{status:200} ) 
    } catch (error) {
        console.log(error);
        return NextResponse.json(`somthing went wrong ${error}`)
        
    }
}




export async function  POST(req:NextResponse) {
       const session  = await ServerSession()

       if(!session){
            return NextResponse.json(`Unauthorized`, {status:400})
       }
      
       const body = await req.json();

       try {
           
             const post = await prisma.post.create({
                data:{
                    ...body,
                    userEmail:session.user?.email
  
                }
             })
             
             return NextResponse.json(post, {status:200})
       } catch (error) {
            console.log(error);
            return NextResponse.json(`somthing went wrong ${error}`)
            
       }
       
}