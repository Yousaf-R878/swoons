import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Explore from "./pages/Explore/Explore";
import LikedPosts from "./pages/LikedPosts/LikedPosts";
import UserSettings from "./pages/UserSettings/UserSettings";
import { AuthorizeProvider } from "./contexts/auth";

function AppContainer() {
  return <App />;
}

function App() {
  return (
    <>
      <AuthorizeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/likes" element={<LikedPosts />} />
          </Routes>
        </BrowserRouter>
      </AuthorizeProvider>
    </>
  );
}

export default AppContainer;
