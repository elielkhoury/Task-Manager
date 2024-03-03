import React, { useState } from "react";
import { ListGroup, Button, FormCheck, FormControl } from "react-bootstrap";

interface TaskItemProps {
  task: {
    id: number;
    name: string;
    status: "active" | "completed";
  };
  onUpdateTask: (id: number, newStatus: "active" | "completed") => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, newName: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdateTask,
  onDeleteTask,
  onEditTask,
}) => {
  // I used useState to manage the editing state and the new name for the task.
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleEdit = () => {
    if (isEditing) {
      onEditTask(task.id, newName);
    }
    setIsEditing(!isEditing); // This toggles the editing state.
  };

  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-center bg-dark text-white border-white"
    >
      <div className="ms-2 me-auto">
        {isEditing ? (
          // When editing, I show a text input where the user can type a new task name.
          <FormControl
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)} // I updated newName as the user types.
          />
        ) : (
          <>
            <FormCheck
              type="checkbox"
              id={`check-${task.id}`}
              checked={task.status === "completed"}
              onChange={
                () =>
                  onUpdateTask(
                    task.id,
                    task.status === "active" ? "completed" : "active"
                  ) // This toggles the task's completion status.
              }
              label={task.name}
              inline
            />
            <span
              className={`badge ${
                task.status === "active" ? "bg-warning" : "bg-success"
              } ms-2`}
              style={{
                minWidth: "75px",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </>
        )}
      </div>
      <div>
        {task.status !== "completed" && (
          // I only show the Update button if the task is not completed.
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleEdit}
            style={{ marginRight: "10px" }}
          >
            {isEditing ? "Save" : "Update"}
          </Button>
        )}

        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onDeleteTask(task.id)}
        >
          Delete
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default TaskItem;
