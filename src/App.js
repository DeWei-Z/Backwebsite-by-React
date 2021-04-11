import './App.less';
import {Route, Switch} from 'react-router-dom'
import 'antd/dist/antd.less';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';

function App() {
  return (
   
    <Switch>
      <Route path='/login' component={Login}  />
      <Route path='/' component={Admin}   />
    </Switch>
    
  );
}

export default App;
