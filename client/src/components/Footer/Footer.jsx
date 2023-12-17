import React from "react";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#FFA39C] text-white body-font">
            <div className="container mx-auto py-4 flex justify-center items-center">
                <p className="text-sm">© 2023 Swoons — All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
