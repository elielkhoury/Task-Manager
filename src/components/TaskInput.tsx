import React, { useState } from "react";
import { Form, Button, InputGroup, Row, Col, Alert } from "react-bootstrap";

interface TaskInputProps {
  onAddTask: (taskName: string) => void;
  tasks: { id: number; name: string; status: "active" | "completed" }[];
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, tasks }) => {
  // I managed the input value and alert visibility state here
  const [task, setTask] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleAddTask = () => {
    // I Checked if the task already exists and is active before adding
    const taskExists = tasks.some(
      (t) => t.name === task && t.status === "active"
    );

    if (taskExists) {
      // If it does, I show an alert and prevent adding the task
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    // If the task doesn't exist, I add it and clear the input field
    onAddTask(task);
    setTask("");
  };

  return (
    <>
      {showAlert && (
        <Alert variant="danger" className="mx-3">
          This task is already active.
        </Alert>
      )}

      <Row className="justify-content-center mt-4">
        <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Add a new task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            />
            <Button
              variant={task.trim() ? "primary" : "outline-light"}
              onClick={handleAddTask}
              disabled={!task.trim()} // The button is disabled if the input is empty
            >
              Add
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
};

export default TaskInput;
