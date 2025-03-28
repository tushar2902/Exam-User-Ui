// components/Settings.js
"use client";
import { useState, useEffect } from "react";
import { FiUser, FiLock, FiBell, FiMoon, FiSun, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { Switch } from "@headlessui/react";

export default function Settings() {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    examReminders: true,
    soundEffects: false,
    accessibility: {
      highContrast: false,
      fontSize: 'medium',
      dyslexiaFont: false
    },
    privacy: {
      showProfile: true,
      activityTracking: true
    }
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load settings from localStorage or API
    const loadSettings = async () => {
      try {
        const savedSettings = localStorage.getItem('studentSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    // Save settings whenever they change
    localStorage.setItem('studentSettings', JSON.stringify(settings));
    
    // Apply dark mode globally
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNestedSettingChange = (parentKey, childKey, value) => {
    setSettings(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Settings</h2>
          </div>
          <nav className="space-y-1 p-2">
            {[
              { id: 'general', icon: <FiUser className="mr-3" />, label: 'General' },
              { id: 'notifications', icon: <FiBell className="mr-3" />, label: 'Notifications' },
              { id: 'accessibility', icon: <FiHelpCircle className="mr-3" />, label: 'Accessibility' },
              { id: 'privacy', icon: <FiLock className="mr-3" />, label: 'Privacy & Security' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.id ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">General Settings</h3>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  {settings.darkMode ? <FiMoon className="mr-3" /> : <FiSun className="mr-3" />}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark theme</p>
                  </div>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onChange={(value) => handleSettingChange('darkMode', value)}
                  className={`${settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span className={`${settings.darkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                </Switch>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Language Preferences</h4>
                <select 
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="english"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notification Settings</h3>
              
              <div className="space-y-4">
                {[
                  { 
                    key: 'notifications', 
                    title: 'Enable Notifications', 
                    description: 'Receive important system notifications',
                    enabled: settings.notifications
                  },
                  { 
                    key: 'examReminders', 
                    title: 'Exam Reminders', 
                    description: 'Get reminders before scheduled exams',
                    enabled: settings.examReminders
                  },
                  { 
                    key: 'soundEffects', 
                    title: 'Sound Effects', 
                    description: 'Play sounds for notifications',
                    enabled: settings.soundEffects
                  }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                    <Switch
                      checked={item.enabled}
                      onChange={(value) => handleSettingChange(item.key, value)}
                      className={`${item.enabled ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                    >
                      <span className={`${item.enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                    </Switch>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'accessibility' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Accessibility Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">High Contrast Mode</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Increase color contrast for better visibility</p>
                  </div>
                  <Switch
                    checked={settings.accessibility.highContrast}
                    onChange={(value) => handleNestedSettingChange('accessibility', 'highContrast', value)}
                    className={`${settings.accessibility.highContrast ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                  >
                    <span className={`${settings.accessibility.highContrast ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                  </Switch>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-white mb-2">Text Size</p>
                  <div className="flex space-x-2">
                    {['small', 'medium', 'large', 'xlarge'].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleNestedSettingChange('accessibility', 'fontSize', size)}
                        className={`px-3 py-1 rounded-md ${settings.accessibility.fontSize === size ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-200'}`}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Dyslexia-Friendly Font</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Use OpenDyslexic font for better readability</p>
                  </div>
                  <Switch
                    checked={settings.accessibility.dyslexiaFont}
                    onChange={(value) => handleNestedSettingChange('accessibility', 'dyslexiaFont', value)}
                    className={`${settings.accessibility.dyslexiaFont ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                  >
                    <span className={`${settings.accessibility.dyslexiaFont ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                  </Switch>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Privacy & Security</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Show Profile to Others</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Allow other students to see your profile</p>
                  </div>
                  <Switch
                    checked={settings.privacy.showProfile}
                    onChange={(value) => handleNestedSettingChange('privacy', 'showProfile', value)}
                    className={`${settings.privacy.showProfile ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                  >
                    <span className={`${settings.privacy.showProfile ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                  </Switch>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Activity Tracking</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Allow the system to track your learning progress</p>
                  </div>
                  <Switch
                    checked={settings.privacy.activityTracking}
                    onChange={(value) => handleNestedSettingChange('privacy', 'activityTracking', value)}
                    className={`${settings.privacy.activityTracking ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                  >
                    <span className={`${settings.privacy.activityTracking ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                  </Switch>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Data Privacy</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    We respect your privacy. You can download or delete your data at any time.
                  </p>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Download My Data
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-600 dark:text-white dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Request Data Deletion
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer with logout action */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex justify-end">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}