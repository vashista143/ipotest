import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setisloggedin, setusername, setmail }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_backendurl}/logout`, {
        method: "GET",
        credentials: "include", // ✅ send cookies
      });

      // Clear frontend state
      setisloggedin(false);
      setusername('');
      setmail('');

      // Navigate to login
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="pt-3">
    <button onClick={handleLogout} className="text-white py-1 bg-[#BC4141] w-full rounded-[5px]">
      Logout
    </button>
    </div>
  );
};

export default LogoutButton;