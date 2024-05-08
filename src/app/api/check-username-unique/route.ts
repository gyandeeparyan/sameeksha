import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";

import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  

  
    await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    const queryParam = {
      username: searchParams.get("username"),
    };

    //zod validation

    const result = UsernameQuerySchema.safeParse(queryParam);

    console.log(result);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message: "Invalid Query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error checking username");
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
