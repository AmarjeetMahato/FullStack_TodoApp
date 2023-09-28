

import Navbar from "@/components/Navbar";
import ReadMore from "@/components/ReadMore";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const getData = async() => {
  try {          
  const res = await fetch(`http://localhost:3000/api/auth/post`,{cache:"no-store"})
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
   return res.json()
  } catch (error) {
     console.log(error);
       
  }
} 





const Home = async () => {
  const posts = await getData();
  console.log(posts);

  return (
    <main>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 px-5 ">
         {
            posts.map((item:any)=>{
              return(
                <>
          <div key={item.id} className='mt-10 bg-gray-950 text-white mx-1 px-4 py-4 gap-5 rounded-md'>
          <h1 className='text-3xl font-md uppercase'>{item.title.substring(0,10)}</h1>
          <div className=''>
            <p className='text-sm py-2'>{item.desc.substring(0,60)}</p>
          </div>

             <ReadMore id={item.id}/>
        </div>
                </>
              )
            })
         }
      </div>
    </main>
  );
};

export default Home;
