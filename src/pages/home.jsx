import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import GreetingCard from "@/components/greeting/greetingCard";
import { fetchQuote } from "@/features/quote/quoteSlice";
import TodoList from "@/components/to-do-list/toDoList";

const mockTodos = [
  { id: 1, text: "Sleep", completed: false },
  { id: 2, text: "Play Games", completed: false },
  { id: 3, text: "Read Books", completed: true },
];

const Home = () => {
  const dispatch = useDispatch();
  const { quote, loading, error } = useSelector((state) => state.quote);

  useEffect(() => {
    dispatch(fetchQuote());
  }, [dispatch]);

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

      <div className="py-6 flex flex-col gap-2">
        {mockTodos.map(todo => (
          <TodoList key={todo.id} todo={todo} />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 shadow-lg">
        <div className="max-w-xl mx-auto relative">
          <input 
            type="text" 
            placeholder="Add a task"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white pr-10"
          />
          <Plus className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        </div>
      </div>
    </div>
  );
};

export default Home;