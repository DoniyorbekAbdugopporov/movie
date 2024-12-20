import React, { useState } from "react";
import { Link } from "react-router-dom";
import header1 from "@/assets/images/header1.png";
import header2 from "@/assets/images/header2.png";
import header3 from "@/assets/images/header3.png";
import header4 from "@/assets/images/header4.png";
import logo from "@/assets/images/logo.png";

const Header = () => {
  const [language, setLanguage] = useState("ru");

  const translations = {
    en: {
      navItems: [
        { to: "/", icon: header1, label: "Schedule" },
        { to: "/", icon: header2, label: "Sessions" },
        { to: "/", icon: header3, label: "Tickets" },
        { to: "/", icon: header4, label: "Search" },
      ],
      login: "Login",
    },
    ru: {
      navItems: [
        { to: "/", icon: header1, label: "Афиша" },
        { to: "/", icon: header2, label: "Сеансы" },
        { to: "/", icon: header3, label: "Билеты" },
        { to: "/", icon: header4, label: "Поиск" },
      ],
      login: "Войти",
    },
    uz: {
      navItems: [
        { to: "/", icon: header1, label: "Jadval" },
        { to: "/", icon: header2, label: "Seanslar" },
        { to: "/", icon: header3, label: "Chiptalar" },
        { to: "/", icon: header4, label: "Qidiruv" },
      ],
      login: "Kirish",
    },
  };

  const currentTranslation = translations[language];

  return (
    <header className="bg-black text-white pt-2">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div>
          <img src={logo} alt="Logo" className="w-24 h-auto" />
        </div>

        <nav className="flex items-center space-x-6">
          {currentTranslation.navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex flex-col items-center justify-center space-x-2 hover:text-red-500"
            >
              <img
                src={item.icon}
                alt={`Icon ${index + 1}`}
                className="w-6 h-6"
              />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <select
            className="bg-black text-white border border-gray-500 rounded px-2 py-1 focus:outline-none"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="ru">Рус</option>
            <option value="en">Eng</option>
            <option value="uz">O‘zb</option>
          </select>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition">
            {currentTranslation.login}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
