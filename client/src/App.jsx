import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Explore from "./pages/Explore/Explore";
import Liked from "./pages/Liked/Liked";

import LikedPosts from "./pages/LikedPosts/LikedPosts";
import UserSettings from "./pages/UserSettings/UserSettings";
import { AuthorizeProvider } from "./contexts/auth";
import Footer from "./components/Footer/Footer";


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
            <Route path="/likes" element={<Liked />} />
          </Routes>
        </BrowserRouter>
<Footer />
      </AuthorizeProvider>
    </>
  );
}

export default AppContainer;
