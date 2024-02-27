import { useEffect } from "react";
import "./Logout.css";
import { Link, useSearchParams } from "react-router-dom";
import { LogoutProps } from "../../interfaces/interface";
import { selectedCardState } from "../../state/AtomSelectedCard";
import { useRecoilValue } from "recoil";

const Logout: React.FC<LogoutProps> = ({children}) => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("displayName") ?? localStorage.getItem("displayName");
  const image = searchParams.get("image") ?? localStorage.getItem("image");
  const selectedCard = useRecoilValue(selectedCardState);

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
          <Link to="/" className={`logout ${selectedCard._id ? "selected-card" : ""}`}>
            Logout
          </Link>
        </div>
      </div>
      {children}
    </>

  );
}

export default Logout;
