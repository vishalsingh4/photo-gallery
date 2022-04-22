import { Routes, Route } from "react-router-dom";

import LoginComponent from "./components/LoginComponent";
import PhotoListComponent from "./components/PhotoListComponent";

import { APP_ROUTES } from "./constants/routes";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path={APP_ROUTES.HOME} element={<LoginComponent />} />
        <Route path={APP_ROUTES.IMAGE_LIST} element={<PhotoListComponent />} />
      </Routes>
    </div>
  );
}

export default App;
