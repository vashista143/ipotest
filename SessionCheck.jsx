import { useEffect } from "react";

const SessionCheck = ({ setisloggedin, setusername, setmail, setLoading }) => {
  useEffect(() => {
    fetch("https://ipotest-0f7u.onrender.com/validate-session", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        if (data.valid) {
          setisloggedin(true);
          setmail(data.user.email);
          setusername(data.user.username)
        } else {
          setisloggedin(false);
        }
      })
      .catch(() => {
        setisloggedin(false);
      })
      .finally(() => {
        setLoading(false); // ✅ Tell App to show routes now
      });
  }, []);

  return null; // nothing to render
};

export default SessionCheck;
