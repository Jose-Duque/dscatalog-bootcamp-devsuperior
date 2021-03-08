import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './core/assets/styles/custom.scss';
import './App.scss';
import Routes from './Router';


const App = () => {
  return (
   <>
    <Routes />
    <ToastContainer />
   </>
  );
}

export default App;

