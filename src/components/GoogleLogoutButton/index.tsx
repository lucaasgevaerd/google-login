import './styles.css';

import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

const clientId =
  "431878615978-1r72grr7ci8dfvev34o186efqo35h4bk.apps.googleusercontent.com";

function GoogleLogoutButton() {
  const navigate = useNavigate();

  const onSuccess = () => {
    console.log("Log out successfull!");
    navigate('/');
  };

  return (
    <GoogleLogout
      render={renderProps => (
        <button type="submit" className="google-logout-button-container" onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <div className="google-logout-button-img">
            <img src="/google-icon.svg" width="22" height="22" alt="google-icon" />
          </div>
          <div className="google-logout-button-description">
            <p>Sair</p>
          </div>
        </button>
      )}
      clientId={clientId}
      buttonText={"Logout"}
      onLogoutSuccess={onSuccess}
    />
  );
}

export default GoogleLogoutButton;
