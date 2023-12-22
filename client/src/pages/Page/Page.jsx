import { useContext } from "react";
import { AuthorizeContext } from "@/src/contexts/auth";
import Navbar from "../../components/Navbar/Navbar";
import NavbarExplore from "../../components/Navbar/NavbarExplore";
import Footer from "@/src/components/Footer/Footer";

const Page = ({ children }) => {
  const { currentUser } = useContext(AuthorizeContext);
  return (
    <>
      {currentUser ? <NavbarExplore /> : <Navbar />}
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Page;
