import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User";
import { useToast } from "./ui/use-toast";
import { ApiResponse } from '../types/ApiResponse';

import axios from "axios";
import CryptoJS from 'crypto-js';
type MessageCardProp = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const   MessageCard= ({ message, onMessageDelete }: MessageCardProp) => {

  const { toast } = useToast();
  const handleDeleteConfirm = async() => {
    const response =await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)

toast({
    title:response.data.message
}) 
onMessageDelete(message._id)
};




if (typeof window === 'undefined'){
  return null
}
  return (
    <div className=" rounded-xl overflow-y-scroll  dark:bg-cardDark  h-32   mb-7">
      <Card className=" dark:bg-cardDark border-0 ">
        <div className="flex items-center">
        <AlertDialog  >
            <AlertDialogTrigger >
              <Button className="rounded-full bg-red-400 !border-none font-extrabold  px-2 mt-6 ml-6" variant='outline'>
                <X className='w-6 h-6' />
              </Button>
             
            </AlertDialogTrigger >
            <AlertDialogContent className="rounded-xl">
              <AlertDialogHeader>
              <AlertDialogTitle className="text-black">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  selected message from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full md:rounded-xl">Cancel</AlertDialogCancel>
                <AlertDialogAction className="rounded-full md:rounded-xl" onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <p className="mt-6 ml-2 text-wrap px-3 py-1 flex-grow-0 rounded-full border-black border-[0.5px] bg-white text-black w-[60%]">{message.feedbackType}</p>
       
        </div>
      <CardContent   >
          <p className="mt-2 ml-2 text-wrap text-black w-[90%]">{message.content}</p>
        </CardContent>
       
      </Card>
    </div>
  );
};

export default MessageCard;
