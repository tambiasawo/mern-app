import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const reduxState = useSelector((state) => state.user);

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          {reduxState.currentUser ? (
            <Link to="/profile">
              <img
                src="https://lh3.googleusercontent.com/a/ACg8ocLEsba99WiEAljabG89GqjvcXTLRKdyoZ8Y9XED2fOkHMEmiSwR=s96-c"
                alt="profile"
                referrerpolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
