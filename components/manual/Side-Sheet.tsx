import React from 'react'
import { Sheet, SheetContent,  SheetTitle,  SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import TransactionForm from './Transaction-Form'

const SideSheet = ({lastpath}:{lastpath:string}) => {


  return (
    <Sheet>
        <SheetTitle></SheetTitle>
    <SheetTrigger asChild>
      {lastpath == 'orders' ? '' :  <Button variant="default" className='tracking-tighter'>Add {lastpath}</Button>}
     
    </SheetTrigger>

    <SheetContent className='p-6'>
      {lastpath == "transactions" && <TransactionForm></TransactionForm>}
      {lastpath == "products" && <h1>a</h1>}
      {lastpath == "delivery-persons" && <h1>a</h1>}
      {lastpath == "inventories" && <h1>a</h1>}
    </SheetContent>

    
  </Sheet>
  )
}

export default SideSheet