import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GreetingCard from "@/components/greeting/greetingCard";
import { fetchQuote } from "@/features/quote/quoteSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { quote, loading, error } = useSelector((state) => state.quote);

  useEffect(() => {
    dispatch(fetchQuote());
  }, [dispatch]);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center text-black"
      style={{
        backgroundImage: `url('/images/bg-default.png')`,
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <GreetingCard />
      </div>

      <div className="flex flex-col items-center justify-center ">
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
    </div>
  );
};

export default Home;
