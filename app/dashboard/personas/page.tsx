import { fetchCustomers, fetchFilteredCustomers } from '@/app/lib/data'
import CustomersTable from '@/app/ui/customers/table'
import PersonasTable from '@/app/ui/personas/table';
import React from 'react'

export default async function CustomersPages() {
const cu = await fetchFilteredCustomers('')

console.log(cu);


  return (
   <>
   <PersonasTable customers={cu}/>
   </>
  )
}
