import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { Button } from 'react-bootstrap';

import { Home } from './pages/home';
import { Upload } from './pages/upload';

export const App = () => {
  const location = useLocation();

  const buttonUpload = location.pathname === '/upload' ? (
      <Link to="/">
        <Button className="px-5" variant="outline-secondary">
          Back to List
        </Button>
      </Link>
    ) : (
      <Link to="/upload">
        <Button className="px-5" variant="outline-primary">
          Upload Image
        </Button>
      </Link>
    )

  return (
    <>
      <div className="container pt-5">
        <div className="border-b">
          <div className="d-flex justify-content-between">
            <div>
              <Link to="/">
                <h3>Manage Images</h3>
              </Link>
              <p>It supports media formats JPG, PNG</p>
            </div>
            <div>
              { buttonUpload }
            </div>
          </div>
        </div>
      </div>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/upload" component={Upload}></Route>
      </Switch>
    </>
  )
}

export default App;
