"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  List,
  Check,
  CalendarOff,
  Trash,
  ListCheck,
  Sigma,
  LoaderCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import EditTask from "@/components/edit-task";

import { getTasks } from "@/actions/get-tasks-from-db";
import { useEffect, useState } from "react";
import { Tasks } from "@/generated/prisma";
import { NewTask } from "@/actions/add-task";
import { deleteTask } from "@/actions/delete-task";
import { toast } from "sonner";
import { upadateTaskStatus } from "@/actions/toggle-done";

const Home = () => {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");
  // console.log(taskList);
  // efeito loading no botão.
  const [loading, setLoading] = useState<boolean>(false);
  {
    /* Função busca informação no banco de dados*/
  }
  const handleGetTasks = async () => {
    try {
      const tasks = await getTasks();

      if (!tasks) return;

      setTaskList(tasks);
    } catch (error) {
      throw error;
    }
  };

  //funçao para adicionar tarefa na tabela
  const handleAddTask = async () => {
    setLoading(true);
    try {
      if (task.length === 0 || !task) {
        toast.error("Digite uma tarefa");
        return;
      }
      //Add tasks
      const myNewTask = await NewTask(task);

      if (!myNewTask) return;

      setTask("");

      //atualizar a tabela
      await handleGetTasks();

      toast.success("Tarefa adicionada com sucesso");
    } catch (error) {
      throw error;
    }
  };

  //Funão para deletar uma tarefa
  const handleDeleteTask = async (id: string) => {
    try {
      if (!id) return;

      const deletedTask = await deleteTask(id);

      if (!deletedTask) return;

      console.log(deleteTask);
      //atualizar a tabela
      //adicionar Sonner shadcn
      await handleGetTasks();
      toast.warning("Tarefa deletada com sucesso");
    } catch (error) {
      throw error;
    }
  };

  //função para alterar estado/cor da tarefa concluida ou nao concluida

  const handleToggleTask = async (taskId: string) => {
    //clonar o array criar um preview para nao afetar o original caso precise voltar
    const previousTask = [...taskList];
    console.log(previousTask);

    // função para atualizar o estado da tarefa
    try {
      setTaskList((prev) => {
        const updateTaskList = prev.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              done: !task.done,
            };
          } else {
            return task;
          }
        });

        return updateTaskList;
      });

      //atualizar o banco de dados
      // await upadateTaskStatus(taskId);
      await upadateTaskStatus(taskId);
    } catch (error) {
      setTaskList(previousTask);
      throw error;
    }
  };

  //Função para pegar tarefa e passar para o componente de edição

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <main className="w-full h-screen bg-gray-300 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          {/*Limpar o imput ao adicionar uma tarefa */}
          <Input
            placeholder="Adicionar tarefa"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <Button
            variant="default"
            className="cursor-pointer"
            onClick={handleAddTask}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : <Plus />}
            Cadastrar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          <div className="flex gap-2">
            <Badge className="cursor-pointer" variant={"default"}>
              <List />
              Todas
            </Badge>
            <Badge className="cursor-pointer" variant={"outline"}>
              <CalendarOff />
              Não finalizadas
            </Badge>
            <Badge className="cursor-pointer" variant={"outline"}>
              <Check />
              Concluídas
            </Badge>
          </div>

          {/* criando laço de repetição / map*/}
          {taskList.map((task) => (
            <div
              className=" h-14 flex justify-between items center  border-t-1"
              key={task.id}
            >
              {/* configurando a cor da tarefa*/}
              <div
                className={`${
                  task.done ? " bg-green-300" : " bg-red-400"
                } w-1 h-full`}
              ></div>
              {/* atualiza nome da atividade*/}
              <p
                className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-700"
                onClick={() => handleToggleTask(task.id)}
              >
                {task.task}
              </p>
              <div className="flex items-center gap-2">
                {/* editar tarefa*/}
                {/* enviar props para o componente*/}
                <EditTask task={task} handleGetTasks={handleGetTasks} />
                {/* deletar tarefa*/}
                <Trash
                  size={16}
                  className="cursor-pointer"
                  onClick={() => handleDeleteTask(task.id)}
                />
              </div>
            </div>
          ))}

          <div className="mt-4 border-b-1"></div>

          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-2">
              <ListCheck size={18} />
              <p className="text-xs">Tarefas concluídas(3/3)</p>
            </div>

            {/* popup */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="text-xs h-7 cursor-pointer"
                  variant="outline"
                >
                  <Trash size={16} className="cursor-pointer" /> Limpar tarefas
                  concluídas
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir x items?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction>Sim</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{ width: "50%" }}
            ></div>
          </div>

          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">3 tarefas no total</p>
          </div>
        </CardContent>

        <div></div>
      </Card>
    </main>
  );
};

export default Home;
