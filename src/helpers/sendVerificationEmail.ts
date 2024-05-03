import {resend} from "@/lib/resend"
import VerificationEmail from "../../emails/VerificationEmail"
import { ApiResponse } from "@/types/ApiResponse"


export async function sendVerificationEmail(
    email:string,
    username:string, 
    verifyCode:string
):Promise<ApiResponse>{

try {
    const data = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Sameeksha | Verification Code',
        react: VerificationEmail({username,otp:verifyCode}),

    })

    return {success:true,message:'Verification email sent successfully !'}
} catch (error) {
 console.log("Error sending verification VerificationEmail",error)   
return {success:false ,message: 'Failed to send verification email'}
}

}

