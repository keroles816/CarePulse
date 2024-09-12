import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AppointmentForms from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/Patient.actions";

export default async function NewAppointment({params:{userId}}:SearchParamProps) {

      const Patient =await getPatient(userId)

 return (
   <div className="flex h-screen max-h-screen ">
      <section className=" remove-scrollbar container my-auto ">
      <div className=" sub-container max-w-[496px]">
        <Image
      src="/assets/icons/logo-full.svg"
      height={1000}
      width={1000}
      alt="patient"
      className="mb-12 h-10 w-fit"
       />
     <AppointmentForms
      type="create"
      userId={userId}
      patientId={Patient.$id}

     
     />
         </div>
         
          <p className="copyright mt-10 py-12">
          © 2024 carePulse
          </p>
    
      </section>


      <Image
      src="/assets/images/appointment-img.png"
      height={1000}
      width={1000}
      alt="patient"
      className=" side-img max-w-[390px] bg-bottom"
      
      />
          </div>
 );
}
