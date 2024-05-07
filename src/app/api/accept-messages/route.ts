import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      {
        status: 400,
      }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser=await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessage: acceptMessages,
      },
      { new: true }
    );

    if(!updatedUser){
        return Response.json(
            {
              success: false,
              message: "Message acceptance status not updated",
            },
            {
              status: 400,
            }
          );
    }

    return Response.json(
        {
          success: true,
          message: "Message acceptance status updated successfully",
        },
        {
          status: 200,
        }
      );
  } catch (error) {
    console.error("Failed to update user status to accept messages");
    return Response.json(
      {
        success: false,
        message: "Failed to update user status to accept messages",
      },
      {
        status: 500,
      }
    );
  }
}


export async function GET(request:Request){
    await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      {
        status: 400,
      }
    );
  }

  const userId = user._id;
  
 try {
     const foundUser=await UserModel.findById(userId)
     if(!foundUser){
       return Response.json(
           {
             success: false,
             message: "User not found",
           },
           {
             status: 400,
           }
         );
     }
   
     return Response.json(
       {
         success: true,
         isAcceptingMessages:foundUser.isAcceptingMessage
       },
       {
         status: 200,
       }
     );
 } catch (error) {
    console.error("Error in getting message acceptance status");
    return Response.json(
      {
        success: false,
        message: "Error in getting message acceptance status",
      },
      {
        status: 500,
      }
    );
  }
  

}