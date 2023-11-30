import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Explore from "./pages/Explore/Explore";

import CreatePost from "./pages/CreatePost/CreatePost";

function AppContainer() {
  return <App />;
}

function App() {
  return (
    <>
      <BrowserRouter forceRefresh={true}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppContainer;
