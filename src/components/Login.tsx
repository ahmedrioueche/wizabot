import React, { useState } from 'react';
import { FaSpinner, FaMoon, FaSun } from 'react-icons/fa';
import chatbot from '../assets/images/chatbot.svg';
import logo from '../assets/images/logo.png';
import { dict } from '../utils/dict';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { AuthApi } from '../apis/authApi';

const LoginForm: React.FC = ({}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{ status: string; message: string }>();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const language = useLanguage();
  const text = dict[language];
  const authApi = new AuthApi();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!username || !password) {
      setIsLoading(false);
      return;
    }

    const response = await authApi.authenticateUser(username, password);
    console.log('response', response);

    if (response) {
      navigate('/main/users');
    } else {
      setResult({ status: 'fail', message: 'Login Failed' });
    }
    setIsLoading(false);
  };

  return (
    <div className="font-f1 flex min-h-screen flex-col md:flex-row">
      {/* Left Section: Form */}
      <div
        className={`relative flex min-h-screen items-center justify-center overflow-hidden md:w-6/12 ${isDarkMode ? 'bg-black' : 'bg-sky-100'} p-8 transition-colors duration-300`}
      >
        {/* Space background with stars and nebula effect */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Stars */}
          <div className="animate-twinkle absolute inset-0">
            {[...Array(200)].map((_, i) => (
              <div
                key={i}
                className={`absolute h-px w-px ${isDarkMode ? 'bg-white' : 'bg-blue-300'}`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: isDarkMode ? Math.random() * 0.7 + 0.3 : Math.random() * 0.4 + 0.1,
                  animation: `twinkle ${Math.random() * 3 + 1}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Nebula effect - different gradients for light/dark mode */}
          <div
            className={`absolute inset-0 ${
              isDarkMode
                ? 'bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-transparent'
                : 'bg-gradient-to-br from-blue-100/50 via-purple-100/30 to-transparent'
            }`}
          />
          <div
            className={`absolute inset-0 ${
              isDarkMode
                ? 'bg-gradient-to-tl from-indigo-900/20 via-blue-900/20 to-transparent'
                : 'bg-gradient-to-tl from-purple-200/20 via-blue-100/10 to-transparent'
            }`}
          />
        </div>

        {/* Form Content */}
        <div className="relative w-full max-w-md backdrop-blur-sm">
          <div className="mb-8 flex flex-col md:mb-8">
            {/* Logo and Image at the Top */}
            <div className="mb-2 flex flex-row items-center justify-center">
              <img src={logo} alt="Logo" className="mb-2" width={38} height={38} />
              <span className={`font-f2 ml-2 text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {text.logo}
              </span>
            </div>
            {/* Slogan */}
            <div className={`text-center text-lg font-normal ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {text.slogan}
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{text.login}</h2>
            <button
              className={isDarkMode ? 'text-white' : 'text-gray-800'}
              onClick={() => toggleTheme()}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                id="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className={`block w-full rounded-md border p-4 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'focus:border-dark-primary focus:ring-dark-primary border-gray-600 bg-gray-800/50 text-white placeholder-gray-400'
                    : 'focus:border-light-primary focus:ring-light-primary border-gray-300 bg-white/50 text-gray-800 placeholder-gray-500'
                }`}
                placeholder={text.usernamePlaceholder}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className={`block w-full rounded-md border p-4 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'focus:border-dark-primary focus:ring-dark-primary border-gray-600 bg-gray-800/50 text-white placeholder-gray-400'
                    : 'focus:border-light-primary focus:ring-light-primary border-gray-300 bg-white/50 text-gray-800 placeholder-gray-500'
                }`}
                placeholder={text.passwordPlaceholder}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`bg-light-primary dark:bg-dark-primary hover:bg-light-accentPrimary dark:hover:bg-dark-accentPrimary flex w-full items-center justify-center rounded-md p-3 text-white transition-colors duration-300`}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : text.login}
            </button>

            {result && result.status === 'fail' && (
              <div className={`mt-4 text-center text-base ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
                {result.message}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="bg-light-secondary dark:bg-dark-secondary hidden w-6/12 flex-1 items-center justify-center md:flex">
        <img src={chatbot} alt={text.loginImageAlt} className="h-full w-full" />
      </div>
    </div>
  );
};

export default LoginForm;
