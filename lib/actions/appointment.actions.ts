'use server'

import { ID, Query } from "node-appwrite"
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, messaging } from "../appwrite.config"
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const CreateAppointment = async (appointment:CreateAppointmentParams)=>{
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),       
            appointment
        
        )  
          return parseStringify(newAppointment);
    } catch (error) {
        console.log(error)
    }
}
  export const getAppointment=async(appointmentId:string)=>{
            try{
        const appointment=await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId
        )
        return parseStringify(appointment)
        }
        catch(error){
            console.log(error)
        }
        }
        export const getRecentAppointmentList=async()=>{
            try {
                const appointments=await databases.listDocuments(
                    DATABASE_ID!,
                    APPOINTMENT_COLLECTION_ID!,
                    [Query.orderDesc('$createdAt')]  
                     
                );
           

                const initialCounts={
                    scheduledCount:0,
                    pendingCount:0, 
                    cancelledCount:0,
                }
        

                const counts=(appointments.documents as Appointment[]).reduce((acc,appointment)=>{
                    //here i have two icrementors for reduce function one for value ==appointment and one for previes value 
                    //all I will do is increment the value according to the status
                    //and increment the default value according to the acc 
                    //then I will show the total count of all appointments in admin page 
                   
                    if(appointment.status ==='scheduled'){
                      acc.scheduledCount+=1;
                     
                    }else if(appointment.status==='pending'){
                        acc.pendingCount+=1;
                    }
                    else if(appointment.status==='cancelled'){
                        acc.cancelledCount+=1;
                    }
                    
                    return acc
                },initialCounts)
                

                const data={
                    totalCount:appointments.total,
                    ...counts,
                    documents:appointments.documents,
                }
                return parseStringify(data)
                
            } catch (error) {
                console.error("Error fetching appointments:", error);
        throw error;
          }
        }
        

        export const updateAppointment=async({appointment,type,userId,appointmentId}
            :UpdateAppointmentParams)=>{
            try {
                const updatedAppointment = await databases.updateDocument(
                    DATABASE_ID!,
                    APPOINTMENT_COLLECTION_ID!,
                    appointmentId,
                    appointment
                )  
                if(!updateAppointment){
                    throw new Error(' Appointment not found')
                } 
                const smsMessage=`Hi,its Care pulse ${
                    type==='schedule'? 
                    `your appointment has been scheduled successfully for
                     ${formatDateTime(appointment.schedule!).dateTime} with a Dr ${appointment.primaryPhysician}`:
                           `we regrat to inform you that your appointment has been cancelled reason ${appointment.cancellationReason}`
                     }`
                //sms notification
                await sendSmsNotification(userId,smsMessage)

                revalidatePath('/admin')
                  return parseStringify(updatedAppointment);
            } catch (error) {
                console.log(error)
            }
        }
        export const sendSmsNotification=async(userId:string,content:string)=>{
            try {
                const message=await messaging.createSms(
                    ID.unique(),
                
                    content,
                    [],
                    [userId],
                );
                return parseStringify(message)
            } catch (error) {
                console.log(error)
            }

        }