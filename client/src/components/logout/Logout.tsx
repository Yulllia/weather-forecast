import { useEffect } from "react";
import "./Logout.css";
import { Link, useSearchParams } from "react-router-dom";
import { LogoutProps } from "../../interfaces/interface";

const Logout: React.FC<LogoutProps> = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("displayName") ?? localStorage.getItem("displayName");
  const image = searchParams.get("image") ?? localStorage.getItem("image");

  const handleLogout = () => {
    // Clear data from localStorage
    localStorage.removeItem("displayName");
    localStorage.removeItem("image");
  };

  useEffect(() => {
    if (name && image) {
      localStorage.setItem("displayName", name);
      localStorage.setItem("image", image);
    }
    return () => {
      handleLogout();
    };
  }, [image, name]);

  return (
    <>
      <div className="logout-container">
        <div className="button-logout">
          {image?.length && <img className="image-user" alt="user" src={image} />}
          <Link to="/" className="logout">
            Logout
          </Link>
        </div>
      </div>
    </>

  );
}

export default Logout;
