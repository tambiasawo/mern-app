import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (isError) setIsError(false);
    setFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setIsLoading(false);

      if (!data.email) {
        setIsError(true);
        return;
      }
      navigate("/home");
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
    }
  };
  return (
    <div className="mx-auto p-3 mt-10">
      <h1 className="text-center font-semibold text-2xl py-3"> Sign In</h1>
      <form
        className="flex justify-center items-center flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          id="email"
          placeholder="Email Address"
          className="bg-slate-50 rounded-lg py-2 px-2 outline-none w-full sm:w-[75%] lg:w-[25%]"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-50 rounded-lg py-2 px-2 outline-none w-full sm:w-[75%] lg:w-[25%]"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 rounded-lg p-3 w-full sm:w-[75%] lg:w-[25%] disabled:opacity-70 hover:opacity-95 uppercase text-white"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
        <div>
          <p>
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="underline hover:text-blue-500 cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </div>
        {isError && (
          <p className="text-red-500">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

export default SignIn;
