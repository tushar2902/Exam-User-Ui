// components/AppSettings.js
"use client";
import { useState, useEffect } from "react";

export default function AppSettings() {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Load settings from local storage or API
    const storedTheme = localStorage.getItem("appTheme") || "light";
    const storedNotifications = localStorage.getItem("appNotifications") === "true";
    const storedLanguage = localStorage.getItem("appLanguage") || "en";

    setTheme(storedTheme);
    setNotifications(storedNotifications);
    setLanguage(storedLanguage);
  }, []);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    localStorage.setItem("appTheme", newTheme);
    // Apply theme change to the application
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleNotificationsChange = (e) => {
    const newNotifications = e.target.checked;
    setNotifications(newNotifications);
    localStorage.setItem("appNotifications", newNotifications);
    // Implement notification settings logic
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem("appLanguage", newLanguage);
    // Implement language change logic
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Application Settings</h2>

      {/* Theme Settings */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Theme</label>
        <select
          value={theme}
          onChange={handleThemeChange}
          className="mt-1 p-2 border rounded-md w-full"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      {/* Notification Settings */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotificationsChange}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Enable Notifications</span>
        </label>
      </div>

      {/* Language Settings */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Language</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="mt-1 p-2 border rounded-md w-full"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          {/* Add more languages */}
        </select>
      </div>
    </div>
  );
}