
import './App.css';
import { BrowserRouter, Switch, Route,} from 'react-router-dom';
import ButtonSelect from './components/selectButton/selectButton';
import LukeApi from './components/lukeApi/lukeApi';


const App = () => {



  return (
    <div className="App">
    <ButtonSelect/> 

<BrowserRouter>
      <div className='container'>
        <Switch>

          <Route path="/:Category/:id" exact render={(routeProps) => <LukeApi {...routeProps} />} />
          <Route path="/:idPeople"  exact render={(routeProps) => <LukeApi {...routeProps} />} />
        </Switch>
      </div>
    </BrowserRouter>

      </div>
  );
}

export default App;
