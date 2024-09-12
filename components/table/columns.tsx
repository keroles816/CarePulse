"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "../ui/button"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentModel from "../AppointmentModel"
import { Appointment } from "@/types/appwrite.types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Appointment>[] = [
 
   {
    header:"ID",
    cell:({row})=> <p className="text-14-medium">{row.index+1}</p>
  },
  {
        // The key used to access the corresponding data for each row in the table
    accessorKey:'patient',
       // The text that will be displayed as the header for the column
    header:'Patient',
        // A function that defines how each cell in the column should be rendered
    cell:({row})=>{
          // Get the appointment object from the current row
      const appointment = row.original
      return <p className="text-14-medium">{appointment.patient.name}</p>
    }
  },
  
 
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
         {/* I will display the status badge according to the status
         coming from server 
         
         */}
       <StatusBadge status={row.original.status}/>

      </div>
    )
  },
  {
    accessorKey: "schedule",
    header: "Appointments",
    cell: ({ row }) =>  {
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    }
  },
  {
    accessorKey: "primaryPhysician",
    header: () => 'Doctor',

    cell: ({ row }) => {
      //I will get the doctor from the doctor array and display the image and name


     const doctor=Doctors.find(doc=>doc.name===row.original.primaryPhysician)
     return(
      <div className=" flex items-center gap-3">
        <Image
        src={doctor?.image!}
        alt="doctor"
        height={100}
        width={100}
        className="size-8"
        
        />
        <p className=" whitespace-nowrap">{doctor?.name}</p>
      </div>
     )
    },
  },

  {
    id: "actions",
    header: () => <div className=" pl-4"> Actions</div>,
  cell: ({ row:{original:data} }) => {
    return (
      <div className=" flex gap-1">
        <AppointmentModel 
        // here i  will pass the type to send to appointment form 
        //and according to type I will display the form for schedule or cancal

        type="schedule"
        patientId={data.patient.$id}
        userId={data.userId}
        appointment={data}
        

        
        
        />
        <AppointmentModel 
        type="cancal"
        patientId={data.patient.$id}
        userId={data.userId}
        appointment={data}
       

        
        />
      </div>
    )
  },
},
  
]

