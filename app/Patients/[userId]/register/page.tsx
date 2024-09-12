import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/Patient.actions";

const Register = async ({params : {userId}}:SearchParamProps) => {

const user=await getUser(userId)
//passing user Id to getuser clerfy by database get user  already coming from nest route [userId]


 return (
   <div className="flex h-screen max-h-screen ">
      <section className=" remove-scrollbar container ">
      <div className=" sub-container max-w-[8606px] flex-1 flex-col py-10">
        <Image
      src="/assets/icons/logo-full.svg"
      height={1000}
      width={1000}
      alt="patient"
      className="mb-12 h-10 w-fit"
       />
 
  <RegisterForm user={user}/>
   {/* pass the acutal data coming fron data base to resister form to save the data already exists name 
   email phone  */}
     
         </div>
         <div className=" tex-14-regular mt-20 flex justify-between">
          <p className=" copyright py-12">
          © 2024 carePulse
          </p>
      
         </div>
        
      </section>
      <Image
      src="/assets/images/register-img.png"
      height={1000}
      width={1000}
      alt="patient"
      className=" side-img max-w-[390px]"
      
      />
          </div>
 );
}
export default Register;