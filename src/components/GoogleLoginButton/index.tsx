import './styles.css';
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { ProfileContext } from '../../App';

const clientId =
  "431878615978-1r72grr7ci8dfvev34o186efqo35h4bk.apps.googleusercontent.com";

function GoogleLoginButton() {

  const { setState } = useContext(ProfileContext)

  const navigate = useNavigate();

  const onSucess = (res: any) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    navigate('/home');
    /* const accessToken = gapi.auth.getToken().access_token;
    console.log(accessToken); */
    /* const accessTokenId = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
    console.log(accessTokenId) */
    setState(res.profileObj);
  };

  const onFailure = (res: any) => {
    console.log("LOGIN FAILED! res: ", res);
  };

  return (
    <>
      <GoogleLogin
        render={renderProps => (
          <button type="submit" className="google-login-button-container" onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <div className="google-login-button-img">
              <img src="/google-icon.svg" width="22" height="22" alt="google-icon" />
            </div>
            <div className="google-login-button-description">
              <p>Entrar com Google</p>
            </div>
          </button>
        )}
        responseType='token'
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSucess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </>
  );
}

export default GoogleLoginButton;
