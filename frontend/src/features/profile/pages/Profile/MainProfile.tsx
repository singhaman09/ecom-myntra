import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../store/store';
import { fetchUser } from '../../redux/slices/userSlice';
import ProfileLayout from '../../components/Layout/ProfileLayout';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const MainProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, error } = useSelector((state: RootState) => state.user);
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const handleItemClick = (itemId: string) => {
    navigate(itemId !== 'profile' ? `/profile/${itemId}` : '/profile');
  };

  if (error || !user) {
    const isLoading = !error;
    return (
      <div style={{
        minHeight: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        color: 'var(--text-primary)'
      }}>
        <span style={{ fontSize: '3rem', color: isLoading ? 'gray' : 'crimson' }}>
          {isLoading ? '⏳' : '⚠️'}
        </span>
        <h2>{isLoading ? 'Loading profile...' : `Oops! Couldn't load profile`}</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          {isLoading ? 'Please wait while we fetch your details.' : 'Server may be offline or unreachable.'}
        </p>
      </div>
    );
  }

  return (
    <ProfileLayout
      activeItem={activeItem}
      onItemClick={handleItemClick}
      user={user}
    >
      <Outlet />
    </ProfileLayout>
  );
};

export default MainProfile;