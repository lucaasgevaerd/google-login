import './styles.css';
import GoogleLogoutButton from '../../components/GoogleLogoutButton';
import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../../App';
import { profile } from '../../types/profile';

function Home() {

  const { state } = useContext(ProfileContext);
  const [profile, setProfile] = useState<profile>({
    email: '',
    familyName: '',
    givenName: '',
    googleId: '',
    imageUrl: '',
    name: '',
  });

  useEffect(() => {
    setProfile(state);
  }, [state])


  return (
    <>
      <div className="home-card-container">
        <h2>Logged in with google account</h2>
        <table>
          <tr>
            <td>Imagem do perfil:</td>
            <td><img src={profile.imageUrl} alt={'Avatar de ' + profile.name} referrerPolicy='no-referrer' /></td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{profile.email}</td>
          </tr>
          <tr>
            <td>Sobrenome:</td>
            <td>{profile.familyName}</td>
          </tr>
          <tr>
            <td>Given name:</td>
            <td>{profile.givenName}</td>
          </tr>
          <tr>
            <td>Id do Google:</td>
            <td>{profile.googleId}</td>
          </tr>
          <tr>
            <td>Nome:</td>
            <td>{profile.name}</td>
          </tr>
        </table>
        <GoogleLogoutButton />
      </div>
    </>
  )
}

export default Home