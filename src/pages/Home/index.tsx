import './styles.css';
import GoogleLogoutButton from '../../components/GoogleLogoutButton';
import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../../App';
import { profile } from '../../types/profile';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  useEffect(() => {
    setProfile(state);
  }, [state])

  const handleSubmit = (event: any) => {
    event.preventDefault();
    navigate('/')
  }

  return (
    <>
      <div className="home-card-container">
        {(profile.imageUrl === '' && profile.googleId === '') ? (
          <h2>Logado com a conta padrão</h2>
        ) : (
          <h2>Logado com a conta Google</h2>
        )}
        <table className='home-card-table'>
          <tbody>
            <tr>
              <td>Imagem do perfil:</td>
              {(profile.imageUrl === '') ? (
                <td className="empty">Sem avatar</td>
              ) : (
                <td className="image-container"><img src={profile.imageUrl} alt={'Avatar de ' + profile.name} referrerPolicy='no-referrer' /></td>
              )}
            </tr>
            <tr>
              <td>Primeiro nome:</td>
              <td>{profile.givenName}</td>
            </tr>
            <tr>
              <td>Sobrenome:</td>
              <td>{profile.familyName}</td>
            </tr>
            <tr>
              <td>Nome completo:</td>
              <td>{profile.name}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{profile.email}</td>
            </tr>
            <tr>
              <td>Id do Google:</td>
              {(profile.googleId === '') ? (
                <td className="empty">Sem id do Google</td>
              ) : (
                <td>{profile.googleId}</td>
              )}
            </tr>
          </tbody>
        </table>
        {(profile.imageUrl === '' && profile.googleId === '') ? (
          <form onSubmit={handleSubmit}>
            <Button buttonText={'Sair'} />
          </form>
        ) : (
          <GoogleLogoutButton />
        )}
      </div>
    </>
  )
}

export default Home