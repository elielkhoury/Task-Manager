import React from "react";
import { ButtonGroup, ToggleButton, Row, Col } from "react-bootstrap";

interface TaskFiltersProps {
  activeFilter: "all" | "active" | "completed";
  onChangeFilter: (filter: "all" | "active" | "completed") => void;
}

// I define the filters available in the task manager.
const filters = [
  { name: "All", value: "all" },
  { name: "Active", value: "active" },
  { name: "Completed", value: "completed" },
];

const TaskFilters: React.FC<TaskFiltersProps> = ({
  activeFilter,
  onChangeFilter,
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as "all" | "active" | "completed";
    onChangeFilter(value); // Notify the parent component of the filter change.
  };

  return (
    <Row>
      <Col xs={12}>
        <ButtonGroup className="w-100">
          {filters.map((filter, idx) => (
            <ToggleButton
              key={idx}
              id={`filter-${filter.value}`}
              type="radio"
              variant={
                activeFilter === filter.value
                  ? "secondary border-white"
                  : "outline-light"
              }
              name="filter"
              value={filter.value}
              checked={activeFilter === filter.value}
              onChange={handleFilterChange}
              className="w-100"
            >
              {filter.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Col>
    </Row>
  );
};

export default TaskFilters;
