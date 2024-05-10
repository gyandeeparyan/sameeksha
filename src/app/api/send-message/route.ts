import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  const { user, content } = await request.json();

  try {
    const { username, content } = await request.json();
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    //is user accepting messages
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting the messages",
        },
        {
          status: 403,
        }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error sending messages", error);
    return Response.json(
      {
        success: false,
        message: "Error sending messages",
      },
      {
        status: 501,
      }
    );
  }
}