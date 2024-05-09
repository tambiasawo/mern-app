import React from "react";
import OAuthBtn from "../components/OAuthBtn";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";

function Profile() {
  const [formData, setFormData] = React.useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!data.email) {
        console.log(data);
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="mx-auto p-3 mt-10">
      <h1 className="text-center font-semibold text-3xl py-3"> Profile</h1>

      <form
        className="flex justify-center items-center flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <img
          src={currentUser.profileImage}
          alt="profile image"
          className="h-24 w-24 rounded-full self-center cursor-pointer object-cover mb-3"
        />
        <input
          type="username"
          id="username"
          placeholder={currentUser.username}
          className="bg-slate-50 rounded-lg py-2 px-2 outline-none w-full sm:w-[75%] lg:w-[35%]"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder={currentUser.email}
          className="bg-slate-50 rounded-lg py-2 px-2 outline-none w-full sm:w-[75%] lg:w-[35%]"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-50 rounded-lg py-2 px-2 outline-none w-full sm:w-[75%] lg:w-[35%]"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 rounded-lg p-3 w-full sm:w-[75%] lg:w-[35%] disabled:opacity-70 hover:opacity-95 uppercase text-white"
          disabled={currentUser.loading}
        >
          {currentUser.loading ? "Loading..." : "Update"}
        </button>

        <div className="flex justify-between w-full sm:w-[75%] lg:w-[35%]">
          <p>
            <Link
              to="/sign-up"
              className="underline cursor-pointer text-red-500 hover:opacity-85"
            >
              Delete Account
            </Link>
          </p>
          <p>
            <Link
              to="/sign-up"
              className="underline hover:opacity-85 cursor-pointer text-red-500"
            >
              Sign Out
            </Link>
          </p>
        </div>
        {currentUser.error && (
          <p className="text-red-500">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

export default Profile;
