'use client'
import React, { useState } from 'react'
   import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import clsx from 'clsx'
import { Appointment } from '@/types/appwrite.types'
import AppointmentForm from './forms/AppointmentForm'
const AppointmentModel = ({
  type, 
  patientId,
  userId,
  appointment
}:
  {
  type:'schedule'|'cancal',
  patientId:string,
  userId:string,
  appointment:Appointment


}) => {

  //here the dialog will be open and close in admin page and then I will show the form
  //the type is the type of the appointment and i will schedule or cancal
  console.log( appointment)
  const[open,setOpen]=useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
   
     
      <Button variant='ghost' className={clsx('capitalize',
         type === 'cancal' ? 'bg-red-500 hover:bg-red-500/10 hover:text-red-500` text-white' : 'bg-green-500 text-white hover:bg-green-500/10 hover:text-green-500')}>
        {type}

      </Button>
    </DialogTrigger>

    <DialogContent className=' shad-dialog sm:max-w-md'>
      <DialogHeader className=' mb-4 space-y-3'>
        <DialogTitle className=' capitalize'>{type} appointment</DialogTitle>
        <DialogDescription>
          Please fill in the following details to {type} your appointment
        </DialogDescription>
      </DialogHeader>

      <AppointmentForm
        type={type}   //it will be schedule or cancal coming from props type colums of actual table   
        patientId={patientId}
        userId={userId}
        appointment={ appointment}
        setOpen={setOpen}
      
      />
    </DialogContent>
  </Dialog>
  
  )
}

export default AppointmentModel