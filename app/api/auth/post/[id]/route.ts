import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"


// Update the post by post id
export async function PATCH(req:NextResponse, {params}:any) {
    try {
        const {id} = params;
         const body = await req.json()
        // Find by the id and update
        const UpdatePost = await prisma.post.update({
            where:{
                id
            },data:{
                 title:body.title,
                 desc:body.desc
            }
        }) 

        // If id not matched
        if(!UpdatePost){
            return NextResponse.json("No post found", {status:404})
        }
       
        // retrun the updated post
        return NextResponse.json("Updated Sucessfully...",{status:200})
    } catch (error) {
        
    }
}



// GET Every User Single POST
export async function GET(req:NextResponse, {params}:any) {
       try {
            // Get the id
            const {id} = params;

            // By id get single post
            const SinglePost = await prisma.post.findUnique({
                where:{
                    id
                }
            }) 
 
            //  If there is no post
            if(!SinglePost){
                return NextResponse.json({msg:"No post found", status:404})
            }
            return NextResponse.json(SinglePost, {status:200})
       } catch (error) {
          console.log(error);
          return NextResponse.json(`Somthing went wrong ${error}`)
          
       }
}




// Delete the post by post id
export async function DELETE(req:NextResponse, {params}:any) {
      try {
            // Get the id
            const {id} = params;
            
            // By id delete post
            await prisma.post.delete({
                where:{
                    id
                }
            })
            return NextResponse.json("post deleted..", {status:200})
      } catch (error) {
        console.log(error);
        return NextResponse.json(`Somthing went wrong ${error}`)
        
      }
}