import { useNavigate } from 'react-router-dom'

export const NotLoggedInPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <div>You are not logged in. Please log in to continue.</div>
      <button onClick={handleLogin}>Log In</button>
    </>
  )
}