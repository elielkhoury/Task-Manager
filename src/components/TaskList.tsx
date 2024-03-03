import React from "react";
import { ListGroup } from "react-bootstrap";
import TaskItem from "./TaskItem";
import { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  filter: "all" | "active" | "completed"; // I receive this prop to know which filter is active.
  onUpdateTask: (id: number, newStatus: "active" | "completed") => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, newName: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filter,
  onUpdateTask,
  onDeleteTask,
  onEditTask,
}) => {
  // I filter the tasks based on the current filter to only show the relevant ones.
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true; // If the filter is 'all', I don't filter out any tasks.
    return task.status === filter; // Otherwise, I only include tasks that match the current filter.
  });

  let message = "";
  switch (filter) {
    case "all":
      message = "Currently, there are no tasks in your list.";
      break;
    case "active":
      message = "There are no active tasks at the moment.";
      break;
    case "completed":
      message = "You have no completed tasks yet.";
      break;
    default:
      message = "No tasks found.";
  }

  return (
    <ListGroup>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id} // I use the task's ID as a key for React's list rendering requirements.
            task={task}
            onUpdateTask={onUpdateTask} // I pass these functions down to manage tasks.
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))
      ) : (
        // If there are no tasks after filtering, I display a message.
        <div className="text-center mt-3">{message}</div>
      )}
    </ListGroup>
  );
};

export default TaskList;
