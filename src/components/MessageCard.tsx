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

type MessageCardProp = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard= ({ message, onMessageDelete }: MessageCardProp) => {
  const { toast } = useToast();
  const handleDeleteConfirm = async() => {
    const response =await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
toast({
    title:response.data.message
}) 
onMessageDelete(message._id)
};

  return (
    <div>
      <Card>
      <AlertDialog>
            <AlertDialogTrigger>
              <Button variant='outline'>
                <X className='w-5 h-5' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  selected message from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        <CardHeader>
          
        

          
        </CardHeader>
        <CardContent>
          <p>{message.content}</p>
        </CardContent>
       
      </Card>
    </div>
  );
};

export default MessageCard;
