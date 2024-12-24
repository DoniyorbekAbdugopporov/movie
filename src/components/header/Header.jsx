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
        { to: "/movies", icon: header2, label: "Movies" },
        { to: "/saved", icon: header3, label: "Saved" },
        { to: "/search", icon: header4, label: "Search" },
      ],
      login: "Login",
    },
    ru: {
      navItems: [
        { to: "/", icon: header1, label: "Афиша" },
        { to: "/movies", icon: header2, label: "Фильмы" },
        { to: "/saved", icon: header3, label: "Сохранено" },
        { to: "/search", icon: header4, label: "Поиск" },
      ],
      login: "Войти",
    },
    uz: {
      navItems: [
        { to: "/", icon: header1, label: "Jadval" },
        { to: "/movies", icon: header2, label: "Kinolar" },
        { to: "/saved", icon: header3, label: "Saqlanganlar" },
        { to: "/search", icon: header4, label: "Qidiruv" },
      ],
      login: "Kirish",
    },
  };

  const { navItems, login } = translations[language];

  return (
    <header className="bg-black text-white pt-2">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div>
          <img src={logo} alt="App Logo" className="w-24 h-auto" />
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex flex-col items-center justify-center hover:text-red-500"
            >
              <img src={item.icon} alt={item.label} className="w-6 h-6" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Language Selector and Login Button */}
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
            {login}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
