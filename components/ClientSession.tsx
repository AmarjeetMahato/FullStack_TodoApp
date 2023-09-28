"use client"

import React from 'react'
import { useSession } from 'next-auth/react'


const ClientSession = () => {
    const {data:session} = useSession()
  return (
    <div>
            {session && (
                <pre>{JSON.stringify(session)}</pre>
            )}
    </div>
  )
}

export default ClientSession