
import React from 'react'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { E164Number } from "libphonenumber-js/core";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { Control } from 'react-hook-form'
import { FormFiledType } from './forms/PatientForm'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
interface CustomProps{
  control: Control<any>,
  filedType:FormFiledType,
  name:string,
  label?:string,
  placeholder?:string,
  iconSrc?:string,
  disabled?:boolean,
   dateFormat?:string,
   showTimeSelect?:boolean,
   children?:React.ReactNode,
   iconAlt?:string,
   renderSkelton?:(filed:any)=>React.ReactNode

}
const RenderFiled =({field,props}:{field:any;props:CustomProps})=>{
    const {dateFormat,showTimeSelect,renderSkelton}=props
    

  switch (props.filedType){
    case FormFiledType.INPUT:
      return(
        <div className=' flex rounded-md border border-x-dark-500 bg-dark-400'>
         {props.iconSrc && (
        <Image
        src={props.iconSrc}
        height={24} 
        width={24}
        alt={props.iconAlt || 'icon'}
        className=' ml-1'
        
        />
         )}
          <FormControl>
            <Input
            placeholder={props.placeholder}
            {...field}
            className=' shad-input bottom-0'

            />
          </FormControl>
        </div>
      )
     case FormFiledType.TEXTAREA:
      return(
        <FormControl>
          <Textarea
          placeholder={props.placeholder}
          {...field}
          className="shad-textArea"
          disabled={props.disabled}
          
          />
        </FormControl>
      )

      case FormFiledType.PHONE_INPUT:
        return(
          <FormControl>
        <PhoneInput
        defaultCountry="US"
        placeholder={props.placeholder}
        international
        withCountryCallingCode
        value={field.value as E164Number | undefined }
        //as E164Number | undefined
        onChange={field.onChange}
        className=' input-phone'
        
        />
          </FormControl>
        )
        case FormFiledType.DATE_PICKER:
          return(
            <div className=' flex rounded-md border
             border-dark-500 bg-dark-400'>

              <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt='calender'
              className=' ml-2'
              />
            <FormControl>
            <DatePicker selected={field.value}
             onChange={(date) => field.onChange(date)} 
             dateFormat={dateFormat ?? 'MM/dd/YYYY'}
             showTimeSelect={showTimeSelect ?? false }
             timeInputLabel='Time:'
             wrapperClassName='date-picker'
             />

            </FormControl>

             </div>
          )

          case FormFiledType.SKELETON:
            return(
              renderSkelton ? renderSkelton(field) :null
            )
          case FormFiledType.SELECT:
            return(
              <FormControl>
                <Select onValueChange={field.onChange}
                defaultValue={field.value}
                >
                  <FormControl
                  
                  >
                    <SelectTrigger className=' shad-select-trigger'>
                         <SelectValue placeholder={props.placeholder}/>
                    </SelectTrigger>
                
                  </FormControl>

                  <SelectContent className=' bg-dark-300 shad-select-contect' >
                    {props.children}
                  </SelectContent>
                   
                </Select>
              </FormControl>
            )
            case FormFiledType.CHECKBOX :
              return(
                <FormControl>
                  <div className=' flex items-center gap-4'>
                    <Checkbox 
                    id={props.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                    <label htmlFor={props.name} className='checkbox-label'>
                      {props.label}


                    </label>
                      
    
                  </div>
                </FormControl>
              )
              default:
                break;
  }
  
}

const CustomFormFiled = (props:CustomProps) => {
 const {control, filedType,name,label}=props
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
           <FormItem className=' flex-1'>
          
            {filedType !==FormFiledType.CHECKBOX && label &&(
              //input not equal checkbox and label='full name'?exists then 
              <FormLabel>{label}</FormLabel>
              //render formlabl called full name coming from props
              //filedtype === formfiledtype as Data type 
            )}
               <RenderFiled field={field} props={props} />
                
           </FormItem>
          )}
        />
  )
}

export default CustomFormFiled