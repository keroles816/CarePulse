

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getAppointment } from '@/lib/actions/appointment.actions';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Succes= async({params:{userId},searchParams}:SearchParamProps) => {
          
    
    const appointmentId =(searchParams?.appointmentId as string) ||' ';
    //theres alot of speasecs looks like %20 %20 in url I clean them with trim ()
    const leanedAppointmentId = appointmentId.trim();

   
       

      const appintment=await getAppointment(leanedAppointmentId)
   
    

     

      const doctor = Doctors.find(doc=>doc.name===appintment.primaryPhysician)


  return (
    <div className=' flex h-screen max-h-screen px-[5%]'>
        <div className=' success-img'>
            <Link href='/'>
            <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"

            />
            </Link>
            <section className=' flex flex-col items-center'>
                <Image
                src="/assets/gifs/success.gif"
                height={300}
                width={280}
                alt="scuccess"
                />

                <h2 className='header mb-6 max-w-[600px] text-center'>
                Your <span className=' text-green-500 '> 
                     appointement request</span>has  been successfully!
                       </h2>
                       <p>we will be in touch shortly to confirm.</p>


            </section>

            <section className=' request-details'>
                <p>Requested appointment detailes:</p>
                <div className=' flex items-center gab-3'>

                        <Image
                        src={doctor?.image!}
                        width={100}
                        height={100}
                        alt="altoo"
                     className='size-6'
                        
                        />

                        <p className=' whitespace-nowrap'>Dr.{doctor?.name}  </p>
                    </div>

                    <div className=' flex gap-2'>
                        <Image
                       src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="clander"
                        />
                            <p>
                           {formatDateTime(appintment.schedule).dateTime}
                                </p>
                    </div>
            </section>


            <Button variant="outline" className='shad-primary-btn' asChild>

                <Link href={`/Patients/${userId}/new-appointment`}>
                New Appointment
                </Link>

            </Button>
            <p className='copyright'>© 2024 carePulse</p>
            
          
        </div>
    </div>
  )
}

export default  Succes;