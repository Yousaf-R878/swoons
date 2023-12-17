import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Explore from "./pages/Explore/Explore";

import UserSettings from "./pages/UserSettings/UserSettings";

function AppContainer() {
  return <App />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/settings" element={<UserSettings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppContainer;
