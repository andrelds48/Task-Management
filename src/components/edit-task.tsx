import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SquarePen } from "lucide-react";
import { Tasks } from "@/generated/prisma";
import { useState } from "react";
import { toast } from "sonner";
import { editTask } from "@/actions/edit-task";

type TasksProps = {
  task: Tasks;
  handleGetTasks: () => Promise<void>;
  // handleGetTasks: () => Promise<void>;
};

//Editando tasks
const EditTask = ({ task, handleGetTasks }: TasksProps) => {
  // Criando variavel de estado para poder alterar a tarefa clicada
  const [editedTask, setEditedTask] = useState(task.task);

  const handleEditTask = async () => {
    //verificando se a tarefa foi alterada ou não. caso não houver nenhuma alteração ao clicar no botão não terá nenhum efeito. caso tenha alteração será atualizado
    try {
      if (editedTask !== task.task) {
        toast.success("Você pode mandar as informações para o banco de dados");
      } else {
        toast.error("As informações não foram alteradas");
        return;
      }

      await editTask({
        idTask: task.id,
        newTask: editedTask,
      });

      //aciona o botão de editar tarefa
      handleGetTasks();
    } catch (error) {
      throw error;
    }

    //atualizar o banco de dados
    // await updateTask(task.id, editedTask);
    // await updateTask(task.id, editedTask);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen size={16} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefas</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          {/* trás a tarefa selecionada para o input */}
          {/* altera a tarefa selecionada */}
          <Input
            placeholder="Editar tarefa"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          {/* Paramos aqui 12/09/25 */}
          {/* atvitando o click do botão */}
          {/* fecha o dialog quando for clicado */}
          <DialogClose asChild>
            <Button className="cursor-pointer" onClick={handleEditTask}>
              Editar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
