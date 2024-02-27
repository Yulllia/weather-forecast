import "./AuthGoogle.css"
import IconGoogle from "../../../assets/google_icon.webp"

function AuthGoogle() {

  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_GOOGLE_REDIRECT}`, '_self');
};
  return (
    <div className="auth-container">
      <div onClick={googleAuth} className="google-login-button">
        <img className="google-icon" width={25} height={25} src={IconGoogle} alt={IconGoogle}/> Log In With Google
      </div>
    </div>
  );
}

export default AuthGoogle;
