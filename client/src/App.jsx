import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Explore from "./pages/Explore/Explore";
import Liked from "./pages/Liked/Liked";
import UserSettings from "./pages/UserSettings/UserSettings";
import { AuthorizeProvider } from "./contexts/auth";
import Footer from "./components/Footer/Footer";
import AuthRoute from "./components/AuthRoute/AuthRoute";

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
            <Route
              path="/explore"
              element={
                <AuthRoute>
                  <Explore />
                </AuthRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <AuthRoute>
                  <UserSettings />
                </AuthRoute>
              }
            />
            <Route
              path="/likes"
              element={
                <AuthRoute>
                  <Liked />
                </AuthRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <Footer />
      </AuthorizeProvider>
    </>
  );
}

export default AppContainer;
