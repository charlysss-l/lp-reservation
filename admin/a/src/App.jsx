import { BrowserRouter , Router} from 'react-router-dom';
import Admin from './pages/Admin';
import 'core-js/stable';
import './App.css';
import router from '../../../backend/src/routes/login';

const App = () => {
  return (
    <BrowserRouter basename="/lp-reservation"
>
    
      <Admin />
    </BrowserRouter>
  );
};

export default App;