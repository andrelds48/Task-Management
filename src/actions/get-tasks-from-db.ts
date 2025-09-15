"use server";
// Toda informação que vem do banco de dados precisa
// informar que é do tipo server
import { prisma } from "@/utils/db-prisma";

// criando funções assincronas
// conectando ao banco de dados
// buscar valores e armazenar em uma constante para ser usada posteriormente
export const getTasks = async () => {
  try {
    const tasks = await prisma.tasks.findMany();
    if (!tasks) return;

    console.log(tasks);

    return tasks;
  } catch (error) {
    throw error;
  }
};
