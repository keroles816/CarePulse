"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SubmitButtom from "../SubmitButtom"

import { Button } from "@/components/ui/button"
import {Form, FormControl} from "@/components/ui/form"
import CustomFormFiled from "../CustomFormFiled"
import { Key } from "lucide-react"
import { useState } from "react"
import { PatientFormValidation} from "@/lib/Validation"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/Patient.actions"
import { FormFiledType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import  Fileuploader  from "../FileUploader"
import { newDate } from "react-datepicker/dist/date_utils"



 const RegisterForm =({user}:{user:User})=> {
  const router=useRouter();
  const[isloading,setisloading]=useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation  >>({
    resolver: zodResolver(PatientFormValidation  ),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email:"",
      phone:"",
    },
  })
   
  // 2. Define a submit handler.
  const  onSubmit = async(values: z.infer<typeof PatientFormValidation  >)=> {
    
    setisloading(true);
    let formData;
   
    if(values.identificationDocument && values.identificationDocument.length > 0){
      const blodFile=new Blob([values.identificationDocument[0]],{
        type : values.identificationDocument[0].type,
      })

       formData =new FormData();
       formData.append('bloFile',blodFile);
       formData.append('fileName',values.identificationDocument[0].name)
    }
    try{
        const PatientData={
          ...values,
          userId:user.$id,
          birthDate:new Date(values.birthDate),
          identificationDocument:formData,

        }
        //@ts-ignore
        const newpatient = await registerPatient(PatientData)
        if(newpatient) {
          router.push(`/Patients/${user.$id}/new-appointment`)
        }
      }
 catch(error){
      console.log(error)
    }
    setisloading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
  

      className="space-y-12 flex-1">
        <section className=" space-y-4" >
          <h1 className=" header">Welcome👋 </h1>

          
          <p className=" text-dark-700">Let us know more about Yourself</p>

        </section>
         
        {/* the sub header  */}
        <section className=" space-y-6" >
        <div className=" mb-9 space-y-1">
        <h2 className=" sub-header">Personal Information</h2>
        </div>
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

      {/* section of email and phone  */}

         <div className=" flex gap-6 flex-col  xl:flex-row">

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

         </div>

         {/* section of birth and gender  */}

         <div className=" flex flex-col gap-6 xl:flex-row">

         <CustomFormFiled 
         filedType={FormFiledType.DATE_PICKER}
         control={form.control}
         name="birthDate"
         label="Date of birth"
         
         />
  
         <CustomFormFiled 
         filedType={FormFiledType.SKELETON}
         control={form.control}
         name="gender"
         label="Gender"
           renderSkelton={(field)=>(
            //pass renderskelton as a props to casing if exist or not 
            <FormControl>
              <RadioGroup className="flex h-11 gap-6 xl:justify-between"
               onValueChange={field.onChange}
               defaultValue={field.value}>
                {GenderOptions.map((option)=>(
                  //gender options comping from constant 
                 <div key={option} className=" radio-group">
                  <RadioGroupItem
                  id={option}
                  value={option}/>

                  <Label htmlFor={option} className=" cursor-pointer">
                    {option}
                  </Label>

                  
                  

                 </div>
                ))}

              </RadioGroup>
            </FormControl>
           )}
  
         />
         </div>

       

        <div className=" flex gap-6 flex-col  xl:flex-row">
              <CustomFormFiled 
              filedType={FormFiledType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="13 st ahmed ibrahim "
              

              />

            <CustomFormFiled 
              filedType={FormFiledType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder="web developer "
              

              />
      </div>


      <div className=" flex gap-6 flex-col  xl:flex-row">
              <CustomFormFiled 
              filedType={FormFiledType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
              />

          <CustomFormFiled 
                  filedType={FormFiledType.PHONE_INPUT}
                  control={form.control}
                  name="emergencyContactNumber"
                  label="Emergency Contact Number"
                  placeholder="+20 123456789"
            
                  />
                 </div>

           <section className=" space-y-6" >
        <div className=" mb-9 space-y-1">
        <h2 className=" sub-header">Medical Information </h2>
        </div>
        </section> 
           
         <CustomFormFiled 
                  filedType={FormFiledType.SELECT}
                  control={form.control}
                  name="primaryPhysician"
                  label="primary Physician"
                  placeholder="Select a Physician"
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
                

                  <div className=" flex gap-6 flex-col  xl:flex-row">
              <CustomFormFiled 
              filedType={FormFiledType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="blueCross BlueShield "
              

              />

            <CustomFormFiled 
              filedType={FormFiledType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance Policy number"
              placeholder="Abbb345667777"
              

              />
               </div>

               <div className=" flex gap-6 flex-col  xl:flex-row">
              <CustomFormFiled 
              filedType={FormFiledType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts,Penicillin,Pollen"
              

              />

            <CustomFormFiled 
              filedType={FormFiledType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current medication (if any)"
              placeholder="Ibuprofen 200mg,
              Paracetamol 500mg"
              

              />
               </div>
  


                    
               <div className=" flex gap-6 flex-col  xl:flex-row">
              <CustomFormFiled 
              filedType={FormFiledType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Family medical history"
              placeholder="Mother had brain cancer, Father had heart disease"
              

              />

            <CustomFormFiled 
              filedType={FormFiledType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="past medical history"
              placeholder="Appendectomy,Tonsillectomy"
              />
               </div>


                <section className=" space-y-6" >
                <div className=" mb-9 space-y-1">
                <h2 className=" sub-header">Identification and Verification </h2>
                </div>
                </section> 
                    
                <CustomFormFiled 
                  filedType={FormFiledType.SELECT}
                  control={form.control}
                  name="identificationType"
                  label="identification Type"
                  placeholder="Select an identification type"
                    >{IdentificationTypes.map(type=>(
                      <SelectItem key={type} value={type}>
                     
                      {type}

                      </SelectItem>
                    ))}
                  </CustomFormFiled>


                <CustomFormFiled 
                    filedType={FormFiledType.INPUT}
                    control={form.control}
                    name="identificationNumber"
                    label="identification Number"
                    placeholder="123444444444 "
              />
            
            <CustomFormFiled 
         filedType={FormFiledType.SKELETON}
         control={form.control}
         name="identificationDocument"
         label="Scanned copy of identification document"
           renderSkelton={(field)=>(
            //pass renderskelton as a props to casing if exist or not 
              <FormControl>
                  <Fileuploader files={field.value} onChange={field.onChange}/>

              </FormControl>
           )}
  
         />
                  <section className=" space-y-6" >
                    <div className=" mb-9 space-y-1">
                    <h2 className=" sub-header">Constent and Privacy</h2>
                    </div>
                    </section> 

                    <CustomFormFiled 
                filedType={FormFiledType.CHECKBOX}
                control={form.control}
                name="treatmentConsent"
                label="I consent to treatment"
                        />
                        <CustomFormFiled 
                            filedType={FormFiledType.CHECKBOX}
                            control={form.control}
                            name="disclosureConsent"
                            label="I consent to disclosure of information"
                                    />
                            <CustomFormFiled 
                            filedType={FormFiledType.CHECKBOX}
                            control={form.control}
                            name="privacyConsent"
                            label="I consent to Privacy policy"
                                    />
                                      

        <SubmitButtom isloading={isloading}>get Started</SubmitButtom>
      </form>
    </Form>
  )
}
export default RegisterForm;
