import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import CreatePost from "./pages/CreatePost/CreatePost";

function AppContainer() {
  return <App />;
}

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <BrowserRouter forceRefresh={true}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppContainer;
