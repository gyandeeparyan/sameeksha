import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const exsistingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (exsistingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const exsistingUserByEmail = await UserModel.findOne({ email });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (exsistingUserByEmail) {
      if (exsistingUserVerifiedByUsername) {
        return Response.json(
          {
            success: false,
            message: "User already exsist with this email",
          },
          { status: 400 }
        );
      } else {
        const hasedPassword = await bcrypt.hash(password, 10);
        exsistingUserByEmail.password = hasedPassword;
        exsistingUserByEmail.verifyCode = verifyCode;
        exsistingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await exsistingUserByEmail.save();
      }
    } else {
      const hasedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hasedPassword,
        verifyCode: verifyCode,
        isVerified: false,
        verifyCodeExpiry: expiryDate,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }

    // send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User registered successfully .Please verify email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
