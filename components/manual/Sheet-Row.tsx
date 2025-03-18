'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import SideSheet from './Side-Sheet'

const SheetRow = () => {
    const pathname = usePathname()
    let lastpath = pathname.split('/').splice(-1)[0].toString();

    if(!lastpath){
        lastpath = "Transaction"
    }

    const isAdminPage = lastpath === "admin" 

  return (
    <>
    {!isAdminPage && 
        <div className='w-[98%] mx-auto p-2 h-14 rounded-lg bg-slate-200 flex items-center justify-between my-2'>
        <h1 className='font-bold text-sm text-black tracking-tight'>{lastpath}</h1>
        <SideSheet lastpath={lastpath}></SideSheet>
    </div>
}
    </>
  )
}

export default SheetRow