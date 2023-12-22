import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Explore from "./pages/Explore/Explore";
import Liked from "./pages/Liked/Liked";
import UserProfile from "./pages/UserProfile/UserProfile";
import { AuthorizeProvider } from "./contexts/auth";
import Footer from "./components/Footer/Footer";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import MyPosts from "./pages/MyPosts/MyPosts";
import Page from "./pages/Page/Page";

function AppContainer() {
  return <App />;
}

function App() {
  return (
    <>
      <AuthorizeProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Page>
                  <Landing />
                </Page>
              }
            />
            <Route
              path="/explore"
              element={
                <AuthRoute>
                  <Page>
                    <Explore />
                  </Page>
                </AuthRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthRoute>
                  <Page>
                    <UserProfile />
                  </Page>
                </AuthRoute>
              }
            />
            <Route
              path="/likes"
              element={
                <AuthRoute>
                  <Page>
                    <Liked />
                  </Page>
                </AuthRoute>
              }
            />
            <Route
              path="/myposts"
              element={
                <Page>
                  <MyPosts />
                </Page>
              }
            />
            <Route
              path="*"
              element={
                <Page>
                  <h1>404</h1>
                </Page>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthorizeProvider>
    </>
  );
}

export default AppContainer;
