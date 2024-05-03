import { Message } from "@/model/User";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptinngMessages?: boolean
    messages?:Array<Message>
}