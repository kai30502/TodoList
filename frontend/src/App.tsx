import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './App.css'
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { BrowserRouter as Router } from "react-router-dom";
// https://coolors.co/palette/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529
// https://uizard.io/templates/website-templates/to-do-website/

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </Router>
  )
};

export default App
