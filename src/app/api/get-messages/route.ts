import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const _user  = session?.user;

  if (!session || !_user) {
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

  const userId = new mongoose.Types.ObjectId(_user._id);

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: '$messages' },
      { $sort: { 'messages.createdAt': -1 } },
      { $group: { _id: '$_id', messages: { $push: '$messages' } } },
    ]).exec();

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 401,
        }
      );
    }
    return Response.json(
      {
     
        messages: user[0].messages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Unexpected error", error);
    return Response.json(
      {
        success: false,
        message: "Unexpected error",
      },
      {
        status: 400,
      }
    );
  }
}
