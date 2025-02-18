"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    //Check if user exists in our db and set to current user
    const userExist = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        PurchasedProjects: {
          select: {
            id: true,
          },
        },
      },
    });

    if (userExist) {
      return {
        status: 200,
        user: userExist,
      };
    }

    //Create new user if not exists
    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName + " " + user.lastName,
        profileImage: user.imageUrl,
      },
    });

    if (newUser) {
      return {
        status: 201,
        user: newUser,
      };
    }

    //In case user not found or created
    return { status: 400 };
  } catch (error) {
    console.log("ERROR", error);
    return { status: 500 };
  }
};
