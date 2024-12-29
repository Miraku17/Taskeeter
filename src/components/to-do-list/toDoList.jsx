import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";

const TodoItem = ({ todo }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-white py-2 px-3 w-full max-w-xl rounded-lg shadow-lg">
        <div className="flex items-center space-x-3">
          <Checkbox 
            className="w-4 h-4 border-2"
            checked={todo.completed}
          />
          <span className={`text-xl text-gray-800 font-medium ${todo.completed ? 'line-through opacity-50' : ''}`}>
            {todo.text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;