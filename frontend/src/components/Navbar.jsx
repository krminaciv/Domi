import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Navbar() {

  const { user, logout } = useContext(UserContext);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          <Link to="/">Domi</Link>
        </h1>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li>
            <Link to="/homes" className="hover:text-blue-600">Homes</Link>
          </li>

          {!user ? (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-600">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-600">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/profile" className="hover:text-blue-600">{user.name}</Link>
              </li>
              <li>
                <button onClick={logout} className="hover:text-red-600">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );

}

export default Navbar;
