"use server";
import { prisma } from "@/utils/db-prisma";

export const upadateTaskStatus = async (taskId: string) => {
  try {
    const currentTask = await prisma.tasks.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!currentTask) return;

    const upadatedStatus = await prisma.tasks.update({
      where: {
        id: taskId,
      },
      data: {
        done: !currentTask.done,
      },
    });

    if (!upadatedStatus) return;

    console.log(upadatedStatus);

    return upadatedStatus;
  } catch (error) {
    throw error;
  }
  // console.log(currentTask);
};

// await prisma.tasks.update({
//     where: {
//       id: taskId,
//     },
//     data: {
//       done: !currentTask.done,
//     },
//   });

/**
 * funcionado para alterar cor e atulizando no banco
 *
 *
 */
// "use server";
// import { prisma } from "@/utils/db-prisma";

// export const upadateTaskStatus = async (taskId: string) => {
//   const currentTask = await prisma.tasks.findUnique({
//     where: {
//       id: taskId,
//     },
//   });

//   if (!currentTask) return;

//   await prisma.tasks.update({
//     where: {
//       id: taskId,
//     },
//     data: {
//       done: !currentTask.done,
//     },
//   });
//   console.log(currentTask);
// };

// teste
// if (currentTask.done) {
//   await prisma.tasks.update({
//     where: {
//       id: taskId,
//     },
//     data: {
//       done: false,
//     },
//   });
// }
