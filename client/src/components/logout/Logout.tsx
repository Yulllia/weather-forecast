import { useEffect } from "react";
import "./Logout.css";
import { Link, useSearchParams } from "react-router-dom";
import { LogoutProps } from "../../interfaces/interface";
import { selectedCardState } from "../../state/AtomSelectedCard";
import { useRecoilValue } from "recoil";

const Logout: React.FC<LogoutProps> = ({children}) => {
  const [searchParams] = useSearchParams();
  const image = searchParams.get("image") ?? localStorage.getItem("image");
  const googleId = searchParams.get("googleId")
  const selectedCard = useRecoilValue(selectedCardState);

  const handleLogout = () => {
    localStorage.removeItem("image");
    localStorage.removeItem("googleId");
  };

  useEffect(() => {
    if (image && googleId) {
      localStorage.setItem("image", image);
      localStorage.setItem("googleId", googleId);
    }
    return () => {
      handleLogout();
    };
  }, [googleId, image]);

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
