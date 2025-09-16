import React from "react";
import { Link } from "react-router-dom";

const quickLinks = [
  { name: "Home", to: "/" },
  { name: "Why Organic", to: "/why-organic" },
  { name: "Innovations", to: "/innovations" },
  // { name: "Get Started", to: "/get-started" },
  { name: "Fetilizers and manures", to: "/fetilizers-and-manures" },
];

const socialIcons = [
  { icon: "🌐", label: "Website", href: "#" },
  { icon: "📘", label: "Facebook", href: "#" },
  { icon: "🐦", label: "Twitter", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-[#2e8b57] text-white pt-10 pb-0 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 pb-6 border-b border-green-300/30">
        {/* Left: Logo & Tagline */}
        <div className="mb-6 md:mb-0">
          <div className="flex items-center gap-2 text-2xl font-bold mb-2">
            <span role="img" aria-label="leaf">🌿</span> Organic Farming Innovations
          </div>
          <div className="text-green-100 text-base font-medium">Growing the future with nature.</div>
        </div>
        {/* Right: Quick Links & Social */}
        <div className="flex flex-col md:items-end gap-4 w-full md:w-auto">
          <div className="flex gap-6 mb-2">
            {quickLinks.map(link => (
              <Link
                key={link.name}
                to={link.to}
                className="text-white hover:text-green-200 transition-colors duration-200 underline-offset-4 hover:underline font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-4">
            {socialIcons.map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-2xl hover:text-green-200 transition-colors duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="text-center py-4 text-green-100 text-sm bg-[#2e8b57]">
        © 2025 | Created by Sumit Mate | Guidance by Rohit H.| Organic Farming Project
      </div>
    </footer>
  );
};

export default Footer; 