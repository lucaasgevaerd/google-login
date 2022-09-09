import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext, ProfileContext } from '../../App';
import { Profile } from '../../types/profile';
import Button from '../Button';
import GoogleLogoutButton from '../GoogleLogoutButton';
import './styles.css';

const initialState = {
  email: '',
  familyName: '',
  givenName: '',
  googleId: '',
  imageUrl: '',
  name: '',
}

function HomeCard() {

  const { state } = useContext(ProfileContext);
  const { setIsAuthenticated } = useContext(AuthenticationContext)
  const [profile, setProfile] = useState<Profile>(initialState);

  const navigate = useNavigate();

  useEffect(() => {
    setProfile(state);
    if (state.name !== "") {
      window.localStorage.setItem('profile', JSON.stringify(state))
    }
  }, [state])

  const handleSubmit = (event: any) => {
    event.preventDefault();
    window.localStorage.removeItem('profile');
    setIsAuthenticated({ value: false })
    navigate('/')
  }

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem('profile')!)) {
      setProfile(JSON.parse(window.localStorage.getItem('profile')!))
    }
  }, [])

  return (
    <>
      {(profile.imageUrl === '' && profile.googleId === '') ? (
        <h2>Logado com a conta padrão</h2>
      ) : (
        <h2>Logado com a conta Google</h2>
      )}
      <table className='home-card-table'>
        <tbody>
          {(profile.imageUrl !== '') && (
            <tr>
              <td>Imagem do perfil:</td>
              <td className="image-container"><img src={profile.imageUrl} alt={'Avatar de ' + profile.name} referrerPolicy='no-referrer' /></td>
            </tr>
          )}
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
          {(profile.googleId !== '') && (
            <tr>
              <td>Id do Google:</td>
              <td>{profile.googleId}</td>
            </tr>
          )}
        </tbody>
      </table>
      {(profile.imageUrl === '' && profile.googleId === '') ? (
        <form onSubmit={handleSubmit}>
          <Button buttonText={'Sair'} />
        </form>
      ) : (
        <GoogleLogoutButton />
      )}
    </>
  )
}

export default HomeCard