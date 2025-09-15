"use server";
import { prisma } from "@/utils/db-prisma";

type EditTaskProps = {
  idTask: string;
  newTask: string;
};

export const editTask = async ({ idTask, newTask }: EditTaskProps) => {
  try {
    if (!idTask || !newTask) return;
    //fazer a busca no banco de dados e a edição
    const editedTask = await prisma.tasks.update({
      where: {
        id: idTask,
        // se você encontrar um id igual a esse,edite
      },
      data: {
        task: newTask,
      },
    });

    if (!editedTask) return;

    return editedTask;
  } catch (error) {
    throw error;
  }
};
