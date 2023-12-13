import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Explore from "./pages/Explore/Explore";
import UploadTest from "./pages/Upload-Test/UploadTest";
import { Upload } from "lucide-react";


// import "./App.css";

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
                  <Route path="/upload-test" element={<UploadTest />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default AppContainer;
