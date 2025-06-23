import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
function App() {
  return (
   <>
    <ToastContainer position="top-center"/>
    <AppRoutes/>
   </>
  );
}

export default App;
