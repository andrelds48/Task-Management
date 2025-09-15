"use server";

import { prisma } from "@/utils/db-prisma";

export const deleteTask = async (taskId: string) => {
  try {
    if (!taskId) return;

    const deletedTask = await prisma.tasks.delete({
      where: {
        id: taskId,
      },
    });

    if (!deletedTask) return;

    return deletedTask;
  } catch (error) {
    throw error;
  }
};
