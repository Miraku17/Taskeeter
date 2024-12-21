import React from "react";

const SignupForm = () => {
  return (
    <>
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1 className="font-semibold text-7xl">Tasketeer</h1>

        <div className="space-y-5">
          <p className="text-md text-gray-600 max-w-lg">
            With only the features you need, Taskeeter is customized for
            individuals seeking a stress-free way to stay focused on their tasks
            and goals.
          </p>

          <button
            type="button"
            className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
          >
            Get started
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account? Sign in
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
