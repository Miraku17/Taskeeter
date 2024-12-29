import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { updateTodo,deleteTodo } from "@/features/todo/todoSlice";
import { useDispatch } from "react-redux";
import { Trash } from "lucide-react";

const TodoItem = ({ todo }) => {
  const [isCompleted, setIsCompleted] = useState(todo.is_completed);
  const dispatch = useDispatch();

  const handleToggle = async () => {
    const updatedTodo = {
      description: todo.description,
      is_completed: !isCompleted,
    };

    try {
      const response = dispatch(
        updateTodo({ id: todo.id, data: updatedTodo })
      );

      if (response.error) {
        console.error("Error updating todo:", response.error);
      } else {
        setIsCompleted(!isCompleted);
        console.log(
          `Todo with ID ${todo.id} toggled. Current state: ${!isCompleted}`
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = dispatch(deleteTodo(todo.id));
      if (response.error) {
        console.error("Error deleting todo:", response.error);
      } else {
        console.log(`Todo with ID ${todo.id} deleted.`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white py-2 px-3 w-full max-w-xl rounded-lg shadow-lg">
        <div className="flex items-center space-x-3">
          <Checkbox
            className="w-4 h-4 border-2"
            checked={isCompleted}
            onChange={handleToggle}
          />
          <div className="flex-1">
            <span
              className={`text-xl text-gray-800 font-medium ${
                isCompleted ? "line-through opacity-50" : ""
              }`}
            >
              {todo.description}
            </span>
          </div>
          <button onClick={handleDelete} className="text-red-500">
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;