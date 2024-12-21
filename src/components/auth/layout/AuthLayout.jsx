import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen p-8 font-['Lexend_Deca']">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        {/* Left side */}
        <div className="w-full md:w-1/2 bg-black rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-between p-12">
            {/* Quote */}
            <div className="relative z-10">
              <h1 className="text-white font-semibold text-4xl md:text-5xl lg:text-7xl leading-tight">
                "Start small, dream big, achieve more."
              </h1>
            </div>

            {/* Main illustration container */}
            <div className="relative h-96 w-full flex items-center justify-center mb-10">

              {/* Person with checklist */}
              <div className="absolute z-10 transform -translate-y-24">
                <img
                  src="/images/person-checklist.png"
                  alt="Person with checklist"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Curly line decoration */}
              <div className="absolute bottom-12 left-1">
                <img
                  src="/images/spring.png"
                  alt="Curly line"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 bg-white border border-gray-200 rounded-3xl flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;