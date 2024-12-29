import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import GreetingCard from "@/components/greeting/greetingCard";
import { fetchQuote } from "@/features/quote/quoteSlice";
import {
  fetchTodos,
  selectTodos,
  createTodo,
  updateTodo,
} from "@/features/todo/todoSlice";
import TodoList from "@/components/to-do-list/toDoList";

const mockTodos = [
  { id: 1, text: "Sleep", completed: false },
  { id: 2, text: "Play Games", completed: false },
  { id: 3, text: "Read Books", completed: true },
];

const Home = () => {
  const dispatch = useDispatch();
  const { quote, loading, error } = useSelector((state) => state.quote);
  const todos = useSelector(selectTodos);
  const [newTodoDescription, setNewTodoDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTodos())
      .then((action) => {
        console.log("Fetched todos from API:", action.payload);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("Todos in Redux store:", todos); // Log todos from Redux store
  // }, [todos]);

  // Handle adding a new todo
  const handleAddTodo = (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    // Trim the description and check if it's not empty
    const trimmedDescription = newTodoDescription.trim();
    if (trimmedDescription) {
      // Dispatch create todo action
      dispatch(createTodo({ description: trimmedDescription }))
        .then(() => {
          // Clear input after successful creation
          setNewTodoDescription("");
        })
        .catch((error) => {
          console.error("Error creating todo:", error);
        });
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center text-black relative"
      style={{
        backgroundImage: `url('/images/bg-default.png')`,
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <GreetingCard />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          {loading ? (
            <p className="text-3xl text-gray-600">Loading quote...</p>
          ) : error ? (
            <p className="text-3xl text-red-600">Failed to load quote</p>
          ) : (
            <>
              <p className="text-5xl font-semibold text-[#242121]">
                {quote?.[0]?.quote || "This too shall pass"}
              </p>
              {quote?.[0]?.author && (
                <p className="text-2xl text-[#242121] opacity-75">
                  - {quote[0].author}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="py-6 flex flex-col gap-2 max-h-[calc(100vh - 100px)] overflow-y-auto">
        {todos.map((todo) => (
          <TodoList key={todo.id} todo={todo} />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 shadow-lg">
        <form onSubmit={handleAddTodo} className="max-w-xl mx-auto relative">
          <input
            type="text"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
            placeholder="Add a task"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white pr-10"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            <Plus className="text-gray-500" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
