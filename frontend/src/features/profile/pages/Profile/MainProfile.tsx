import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../../store/store';
import type { RootState } from '../../../../store/store';
import { fetchUser } from '../../redux/slices/userSlice';
import ProfileLayout from '../../components/Layout/ProfileLayout';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
const MainProfile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
   const navigate=useNavigate()
  const userState = useSelector((state: RootState) => state.user);
  const { user } = userState;
  const location=useLocation()
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [breadCrumbs,setBreadCrumbs]=useState('profile')
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
useEffect(()=>{
  setActiveItem(location.pathname)
},[location])
  const handleItemClick = (itemId: string) =>{
    setBreadCrumbs(itemId)
    if(itemId!=="profile"){
      navigate(`/profile/${itemId}`)
    }
    else{
      navigate('/profile')
    }
  };

  
  if (!user) return "No data";

  return (
    <ProfileLayout
      activeItem={activeItem}
      onItemClick={handleItemClick}
      title="Profile"
      subtitle="Manage your account"
      breadcrumbs={['Account', breadCrumbs]}
      user={user}
    >
      <Outlet/>
    </ProfileLayout>
  );
}

export default MainProfile