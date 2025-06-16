import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../../store/store';
import type { RootState } from '../../../../store/store';
import { fetchUser } from '../../redux/slices/userSlice';
import Profile from './Profile';
import Addresses from '../Addresses/Addresses';
import ProfileLayout from '../../components/Layout/ProfileLayout';
import DeleteAccount from '../DeleteAccount/DeleteAccount';
import TermsOfUse from '../Legal/TermsOfUse';
import PrivacyPolicy from '../Legal/PrivacyPolicy';
import ChangePassword from '../ChangePassword/ChangePassword';

const MainProfile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
  const [activeItem, setActiveItem] = useState('profile');
  const userState = useSelector((state: RootState) => state.user);
  const { user, loading: userLoading, error: userError } = userState;

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleItemClick = (itemId: string) => setActiveItem(itemId);
  const handleUpdateProfile = () => {};

  const getPageContent = () => {
    if (activeItem === 'profile') {
      return user ? <Profile user={user} onUpdateProfile={handleUpdateProfile} /> : null;

    }
    if (activeItem === 'addresses') {
      return <Addresses />;
    }
    if (activeItem === 'change-password') {
      return <ChangePassword />;
    }
    if (activeItem === 'delete-account') {
      return <DeleteAccount onGoBack={() => setActiveItem('profile')} />;
    }
    if (activeItem === 'terms') {
      return <TermsOfUse />;
    }
    if (activeItem === 'privacy') {
      return <PrivacyPolicy />;
    }
    return user ? <Profile user={user} onUpdateProfile={handleUpdateProfile} /> : null;

  };
  console.log(user);
  if (!user) return null;

  return (
    <ProfileLayout
      activeItem={activeItem}
      onItemClick={handleItemClick}
      title="Profile"
      subtitle="Manage your account"
      breadcrumbs={['Account', activeItem]}
      user={user}
    >
      {userLoading ? <div>Loading...</div> : userError ? <div>{userError}</div> : getPageContent()}
    </ProfileLayout>
  );
}

export default MainProfile