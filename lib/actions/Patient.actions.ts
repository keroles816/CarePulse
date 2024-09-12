"use server";

import { ID, Query } from "node-appwrite"
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils";
import { stringify } from "querystring";
import {InputFile }from "node-appwrite/file"


export const createUser =async (user : CreateUserParams)=>{
try {
    
    const newUser = await users.create( 
    ID.unique(),
    user.email,
    user.phone,
    undefined,
    user.name
 //wait until the processs  to complete mean send query
)
console.log("data is react to")

return parseStringify(newUser)

} catch (error:any) {
    if(error && error?.code===409){
        const documents = await users.list([
            Query.equal('email',[user.email])
            //if the user already exist in database 
            //409 means user already exist 
        ])
        return documents?.users[0]
        //return an email of this user 
    }
    console.error(error)
}


}

   export const getUser =async (userId : string)=>{
    try {
        const user =await users.get(userId)
        return parseStringify(user)
    } catch (error) {
        console.log(error);
    }

}


export const getPatient =async (userId : string)=>{
    try {
        const Patients=await databases.listDocuments(
           
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        [Query.equal('userId',userId)]
        )
        return parseStringify(Patients.documents[0])
    } catch (error) {
        console.log(error);
    }

}

        export const registerPatient=async ({identificationDocument,...patient}:RegisterUserParams)=>{

                try {
                    let file;
                    if (identificationDocument){
                        const inputFile=InputFile.fromBuffer(
                            identificationDocument?.get('blobFile') as Blob ,
                            identificationDocument?.get('fileName') as string,
                        )
                        file= await storage.createFile(BUCKET_ID!,ID.unique(),inputFile)
                    }
                    const newPatient = await databases.createDocument(
                        DATABASE_ID!,
                        PATIENT_COLLECTION_ID!,
                        ID.unique(),{
                            identificationDocumentId:file?.$id||null,
                            identificationDocumentUrl:`${ENDPOINT}/storage/buckets/
                            ${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
                            ...patient
                        

                        }

                    )
                    return parseStringify(newPatient);


                } catch (error) {
                    console.log(error)
                }

            }