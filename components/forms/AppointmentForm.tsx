"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SubmitButtom from "../SubmitButtom"

import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import CustomFormFiled from "../CustomFormFiled"
import { Key } from "lucide-react"
import { useState } from "react"
import { getAppointmentSchema  } from "@/lib/Validation"
import { useRouter } from "next/navigation"
import { FormFiledType } from "./PatientForm"
import { SelectItem } from "../ui/select"
import { Doctors } from "@/constants"
import Image from "next/image"
import { CreateAppointment, updateAppointment } from "@/lib/actions/appointment.actions"
import { Appointment } from "@/types/appwrite.types"

        const AppointmentForms =(
          {
            userId,
            patientId,
            type='create',
            appointment,
            setOpen
          }: 
          {
            userId:string,
            patientId:string
            ,type:"create" | "cancal"| "schedule",
            appointment?:Appointment,
            setOpen:(open:boolean)=>void
          
          })=> {
            //i will create an appointment here with the data from the form but i will check the type of appointment
            //the props patiend I grapt it from props with getpatient from server 
            //and type I define as string with create
     const router=useRouter();

          const[isloading,setisloading]=useState(false);
      // 1. Define your form.

     const AppointmentFormValidation= getAppointmentSchema(type)
              //it will validate according to type of appointment
          const form = useForm<z.infer<typeof AppointmentFormValidation >>({
            resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician:appointment ? appointment.primaryPhysician :'',
       schedule:appointment? new Date(appointment.schedule) : new Date(Date.now()),
        reason:appointment ? appointment.reason : '',
         note:appointment ?.note || '',
         cancellationReason: appointment ?.cancellationReason || '',
       },
          })
          
     // 2. Define a submit handler.
                      const  onSubmit = async(values: z.infer<typeof AppointmentFormValidation >)=> {
                        
                         setisloading(true);
                           //here acording to the type of appointment i will create an appointment
                          
                        let status;
                        switch(type){
                          case 'schedule':
                            status="scheduled";
                            break;

                            case 'cancal':
                              status="cancelled"
                              break;

                              default:
                              status='pending'
                              
                        }


                        try{
                        
                        //i will create an appointment here with the data from the form but i will check the type of appointment
                    
                          if(type === 'create' && patientId){
                            const appointmentData = {
                              userId,
                                patient:patientId,
                                primaryPhysician:values.primaryPhysician,
                                schedule:new Date(values.schedule) ,
                                 reason:values.reason!,
                                  note:values.note,
                                  status:status as Status //scheduled, cancelled, pending
                                  
                              };
                            
                          const appointment = await CreateAppointment(appointmentData)
                          if(appointment){
                            form.reset();
                router.push
                  (`/Patients/${userId}/new-appointment/success?appointmentId=
                              ${appointment.$id}`)
                          }
                          }else{
                            //hre i will update the appointment
                            // according to the type schedule or cancal
                            const appointmentToUpdate = {
                              userId,
                              appointmentId:appointment?.$id!,
                              appointment:{
                                primaryPhysician:values?.primaryPhysician,
                                schedule:new Date(values?.schedule) ,
                                 reason:values.reason!,
                                  note:values.note,
  //I set status according to the type if it is schedule or cancal 
  //coming from props I set status scheduled or cancelled after checking the switch case
                                  status:status as Status,
//here i set the cancellationReason if it is cancal and set it to empty string  if it is not cancal
//in the form default it will be empty string
                                  cancellationReason:values?.cancellationReason
                              },
                              type
                            }
//this will update the appointment with updateAppointment                            
                          const updatedAppointment = await updateAppointment(appointmentToUpdate)
                          if(updatedAppointment){
                            setOpen && setOpen(false);
                            form.reset();
                           
                          }

                        }
                      }catch(error){
                          console.log(error)
                        }
                        setisloading(false);
                      }

                        let buttonLabel;
  //here i set the button label according to the type of appointment
                        switch(type){
                          case 'cancal': 
                            buttonLabel='Cancel Appointment'
                            break;
                            
                              case "schedule":
                                buttonLabel='schedule Appointment'
                                break;
                                default:
                                   buttonLabel='Submit Appointment'

                        }

                      return (
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                         {type === 'create' &&  <section className="mb-12 space-y-4">
                              <h1 className=" header">New Appointment 👋 </h1>
                              <p className=" text-dark-700">Request a new appointement in 10 seconds</p>


                            </section>} 

                            {type !== "cancal" &&(
                              <>
                         <CustomFormFiled 
                  filedType={FormFiledType.SELECT}
                  control={form.control}
                  name="primaryPhysician"
                  label="Doctor"
                  placeholder="Select a Doctor"
                    >{Doctors.map(doctor=>(
                      <SelectItem 
                      key={doctor.name}
                      value={doctor.name}
                      >
                        <div className=" flex cursor-pointer items-center gap-2">
                          <Image
                          src={doctor.image}
                          width={32}
                          height={32}
                          alt={doctor.name}
                          className=" rounded-full border border-dark-500"
                          />
                          <p>{doctor.name}</p>

                        </div>


                      </SelectItem>
                    ))}
                  </CustomFormFiled>


                  <CustomFormFiled
                  filedType={FormFiledType.DATE_PICKER}
                  control={form.control}
                  name="schedule"
                  label="Expected appointment date"
                  showTimeSelect
                  dateFormat="MM/dd/yyyy - h:mm aa"
                  
                  
                  />


     <div className=" flex  flex-col gap-6 xl:flex-row">    
                              
            <CustomFormFiled 
              filedType={FormFiledType.TEXTAREA}
              control={form.control}
              name="reason"
              label="reason for appointment"
              placeholder="Enter reason for appointment"
              />
              
            <CustomFormFiled 
              filedType={FormFiledType.TEXTAREA}
              control={form.control}
              name="note"
              label="Notes"
              placeholder="Enter notes"
              />
                         
                         
        
                                    </div>
                              
                              </>
                            )}
{/* here i will set the cancellationReason if the type comming from props === 'cancal' if it is cancal */}
                            {type ==="cancal" &&(

                                  <CustomFormFiled 
                                  filedType={FormFiledType.TEXTAREA}
                                  control={form.control}
                                  name="cancellationReason"
                                  label="reason for cancellation"
                                  placeholder="Enter reason for cancellation appointment"
                                  />
                            )}
                            
                            
                           
          <SubmitButtom 
          isloading={isloading} 
          //@ts-ignore
          className={`${ type ==="cancal" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
          >{buttonLabel}
          </SubmitButtom>
                          </form>
                        </Form>
                      )
                    }
                    export default AppointmentForms;




