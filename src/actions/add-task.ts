"use server";
import { prisma } from "@/utils/db-prisma";

// variavel de estado
//pegar o valor do imput e gravar no banco
//verificar se o imput esta vazio
export const NewTask = async (taskName: string) => {
  if (!taskName) return;

  try {
    const newTask = await prisma.tasks.create({
      data: {
        task: taskName,
        done: false,
      },
    });

    if (!newTask) return;

    return newTask;
  } catch (error) {
    throw error;
  }
};
// try {
//     const newTask = await prisma.tasks.create({
//       data: {
//         task,
//       },
//     });
//     return newTask;
//   } catch (error) {
//     throw error;
//   }
