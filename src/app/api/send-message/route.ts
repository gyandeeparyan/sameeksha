import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";
import Cryptr from 'cryptr';
export async function POST(request: Request) {
  await dbConnect();
  const SECRET_KEY = String(process.env.CRYPTOJS_SECRET) ;
  const cryptr = new Cryptr(SECRET_KEY,{ encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });
  if (!SECRET_KEY) {
    throw new Error("CRYPTOJS_SECRET environment variable is not set.");
  }
  function encryptContent(content:string):string {
  const encrypted=cryptr.encrypt(content)
  console.log("Encrypted Content (Backend):", encrypted);
  return encrypted;
  }

  const { username, content } = await request.json();

  console.log(content);

  try {
    const user = await UserModel.findOne({ username }).exec();
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
    const encryptedContent = encryptContent(content);
    console.log(encryptedContent)
    console.log(typeof(encryptedContent))

    const newMessage = { content:encryptedContent, createdAt: new Date() };

    user.messages.push(newMessage as unknown as Message);
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
