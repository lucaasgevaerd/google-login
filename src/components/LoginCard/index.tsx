import './styles.css';
import GoogleLoginButton from '../GoogleLoginButton';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId =
  "431878615978-1r72grr7ci8dfvev34o186efqo35h4bk.apps.googleusercontent.com";

function LoginCard() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };

    gapi.load("client:auth2", start)
  });

  return (
    <div className="login-card-container">
      <form action="" className="login-card-form">
        <input type="email" name="email" className="login-card-inputs" placeholder="Email" />
        <input type="password" name="password" className="login-card-inputs" placeholder="Senha" />
        <button type="submit" name="form-submit-button" className="login-card-button" >Entrar</button>
      </form>
      <GoogleLoginButton />
    </div >
  )
}

export default LoginCard