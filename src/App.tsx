import React, { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import { Task } from "./types";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  // I initialized my task list by trying to load any stored tasks from localStorage.
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("todo-list");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  // I used this state to control the loading spinner visibility.
  const [isLoading, setIsLoading] = useState(false);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("todo-list", JSON.stringify(newTasks));
  };

  // When adding a task, I ensure it's marked as 'active' by default.
  const addTask = (name: string) => {
    saveTasks([...tasks, { id: Date.now(), name, status: "active" }]);
  };

  // This allows me to update the status of a task, toggling between 'active' and 'completed'.
  const updateTaskStatus = (id: number, newStatus: "active" | "completed") => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    saveTasks(updatedTasks);
  };

  // Here, I filtered out the task to be deleted and update the state and localStorage.
  const deleteTask = (id: number) => {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    saveTasks(remainingTasks);
  };

  const editTask = (id: number, newName: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, name: newName } : task
    );
    saveTasks(updatedTasks);
  };

  const handleFilterChange = (newFilter: "all" | "active" | "completed") => {
    setIsLoading(true);
    setTimeout(() => {
      setFilter(newFilter);
      setIsLoading(false);
    }, 500);
  };

  // I filtered tasks based on the current filter selection to display them accordingly.
  const filteredTasks = tasks.filter(
    (task) => filter === "all" || task.status === filter
  );

  return (
    <Container
      fluid
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-dark text-white"
    >
      <Row className="w-100 mb-5">
        <Col>
          <h1 className="text-center">My Task Manager</h1>
          <p className="text-center">
            Manage your To-Dos and never miss a task again !
          </p>
        </Col>
      </Row>
      <Row className="w-100">
        <Col xs={12}>
          <TaskInput onAddTask={addTask} tasks={tasks} />
        </Col>
      </Row>
      <Row className="w-100">
        <Col>
          <TaskFilters
            activeFilter={filter}
            onChangeFilter={handleFilterChange}
          />
        </Col>
      </Row>
      <Row className="w-100">
        <Col>
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100px" }}
            >
              <Spinner animation="border" />
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              filter={filter}
              onUpdateTask={updateTaskStatus}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
