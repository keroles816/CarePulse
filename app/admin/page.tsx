
import Link from 'next/link'
import React, { useEffect } from 'react'
import Image from 'next/image'
import StatCard from '@/components/StatCard'
import {DataTable }from '@/components/table/DataTable'
import {columns} from '@/components/table/columns'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'





const Admin = async() => {
   // it return appointments.scheduledCount,appointments.pendingCount,appointments.cancelledCount
   //and the whole appointments to access it in the table with coloum
 
         const appointments= await getRecentAppointmentList()
  // Fetch appointments when the page loads
  

  return (
    <div className=' mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className=' admin-header'>
            <Link href="/" className="cursor-pointer">
            <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
            
            />
            
            </Link>
                <p className='text-16-semibold'>Admin Dashboard</p>
        </header>
        <main className='admin-main'>
            <section className=' w-full space-y-4'>

                <h1 className=' header'>welcome 👋</h1>
                <p className='text-dark-700'>Start the day with managing new appointment</p>
            </section>
            <section className=' admin-stat'>
                <StatCard
                type="appointments"
                count={appointments.scheduledCount}
                label="Scheduled appointments"
                icon="/assets/icons/appointments.svg"
                />
                <StatCard
                type="pending"
                count={appointments.pendingCount}
                label="pending appointments"
                icon="/assets/icons/pending.svg"
                />
                <StatCard
                type="cancelled"
                count={appointments.cancelledCount}
                label="cancelled appointments"
                icon="/assets/icons/cancelled.svg"
                />
            </section>

            <DataTable columns={columns} data={appointments.documents}/>
            
        </main>
    </div>
  )
}

export default Admin