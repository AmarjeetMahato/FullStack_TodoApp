
import {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/libs/prismadb"
import bcrypt from 'bcrypt'
import {PrismaAdapter} from "@next-auth/prisma-adapter"

export const authOptions: NextAuthOptions = {
    adapter:PrismaAdapter(prisma),
    
    providers:[
           
        CredentialsProvider({
        name: "Credentials",

        credentials: {
        email: {
          type: "email",
          name: "email",
        },
        password: { type: "password", name: "password" },
      },
       async authorize(credentials){

              if(!credentials?.email || !credentials?.password){
                return null;
              };
             
            // Find the unique User
             const user = await prisma?.user.findUnique({
                     where:{
                        email:credentials?.email
                     }
             })
         
            if(!user || !user?.hashedPassword){
                return null
            }

            // Check Password
              const passwordChecked = await bcrypt.compareSync(credentials.password, user.hashedPassword)

              if(!passwordChecked){
                return null
              }


              return user
       }

        })
    ],
     callbacks:{
        session:async({session, token, user})=>{
          if(session?.user){
            // console.log(session);
            
            session.user.email = token.email
          }
          return session;
        },
        jwt: async({user, token})=>{
          if(user){
            token.id = user.id

          }
          // console.log(token);
          return token;
         
          
        }
     },
  //    pages:{
  //     // signIn:'/sign-in',
  //     // error:'/sign-in'
  //  },
     session:{
        strategy:"jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
     },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
}