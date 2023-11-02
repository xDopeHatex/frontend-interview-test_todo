/* VENDOR */
import { useSelector } from "react-redux";

/* APPLICATION */
import TaskListItem from "./TaskListItem";
import { selectAllTasks } from "../store/tasksSlice";

export const Tasks: React.FC = () => {
  const tasks = useSelector(selectAllTasks);

  return (
    <ul>
      {tasks.map((task) => (
        <TaskListItem key={task.id} item={task} />
      ))}
    </ul>
  );
};

export default Tasks;

// можно попробовать вынести svg в отдельный файл в виде кода
