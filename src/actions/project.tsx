"use server";

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { OutlineCard } from "@/lib/types";

export const getAllProjects = async () => {
  try {
    //Get authenticated user
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not found" };
    }

    // get all projects (not in the trash)
    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (projects.length === 0) {
      return { status: 404, error: "No projects found" };
    }

    return {
      status: 200,
      data: projects,
    };
  } catch (error) {
    console.log("ERROR", error);
    return { status: 500, error: "Server Error" };
  }
};

export const getRecentProjects = async () => {
  try {
    //Get authenticated user
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not found" };
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },

      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });

    if (projects.length === 0) {
      return { status: 404, error: "No projects found" };
    }

    return { status: 200, data: projects };
  } catch (error) {
    console.log("ERROR", error);
    return { status: 500, error: "Server Error" };
  }
};

export const recoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not found" };
    }

    const project = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: false,
      },
    });

    if (!project) {
      return { status: 500, error: "Failed to recover project" };
    }

    return { status: 200, data: project };
  } catch (error) {
    console.log("ERROR", error);
    return { status: 500, error: "Server Error" };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not found" };
    }

    const project = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: true,
      },
    });

    if (!project) {
      return { status: 500, error: "Failed to recover project" };
    }

    return { status: 200, data: project };
  } catch (error) {
    console.log("ERROR", error);
    return { status: 500, error: "Server Error" };
  }
};

export const createProject = async (title: string, outlines: OutlineCard[]) => {
  try {
    if (!title || outlines.length === 0 || !outlines) {
      return { status: 400, error: "Invalid request" };
    }

    const allOutlines = outlines.map((outline) => outline.title);
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not found" };
    }

    const project = await client.project.create({
      data: {
        title,
        userId: checkUser.user.id,
        outlines: allOutlines,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    if (!project) {
      return { status: 500, error: "Failed to create project" };
    }

    return { status: 200, data: project };
  } catch (error) {
    console.log("ERROR", error);
    return { status: 500, error: "Server Error" };
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not found" };
    }

    const project = await client.project.findFirst({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return { status: 404, error: "Project not found" };
    }

    return { status: 200, data: project };
  } catch (error) {
    console.log("ERROR", error);
    return { status: 500, error: "Server Error" };
  }
};
