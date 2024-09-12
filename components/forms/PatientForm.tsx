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
import { UserFormValidation } from "@/lib/Validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/Patient.actions"
export enum FormFiledType{
  INPUT="input",
  TEXTAREA="textarea",
  PHONE_INPUT="phoneInput",
  CHECKBOX="checkbox",
  DATE_PICKER='datePicker',
  SELECT="select",
  SKELETON='skeleton',

}




 const PatientForm =()=> {
  const router=useRouter();
  const[isloading,setisloading]=useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation >>({
    resolver: zodResolver(UserFormValidation ),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })
   
  // 2. Define a submit handler.
  const  onSubmit = async(values: z.infer<typeof UserFormValidation >)=> {
    
    setisloading(true);
    try{
      const userData = {
       name:values.name,
        email:values.email,
        phone:values.phone
      };

      const user=await createUser(userData)
      
      if(user){
        
       router.push(`/Patients/${user.$id}/register`)
      }
  }catch(error){
      console.log(error)
    }
    setisloading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className=" header">hi there 👋 </h1>
          <p className=" text-dark-700">Schedule your first Appointment</p>
        </section>
         
        
         <CustomFormFiled 
         filedType={FormFiledType.INPUT}
         control={form.control}
         name="name"
         label="full name"
         placeholder="John doeee"
         iconSrc="/assets/icons/user.svg"
         iconAlt="place"
        
         />
                
         <CustomFormFiled 
         filedType={FormFiledType.INPUT}
         control={form.control}
         name="email"
         label="Email"
         placeholder="John doeee123@gmail.com"
         iconSrc="/assets/icons/email.svg"
         iconAlt="email"
        
         />
  
         <CustomFormFiled 
         filedType={FormFiledType.PHONE_INPUT}
         control={form.control}
         name="phone"
         label="Phone Number"
         placeholder="+20 123456789"
  
         />

        <SubmitButtom isloading={isloading}>get Started</SubmitButtom>
      </form>
    </Form>
  )
}
export default PatientForm;
