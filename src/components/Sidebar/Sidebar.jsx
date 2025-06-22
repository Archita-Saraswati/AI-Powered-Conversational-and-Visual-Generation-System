



import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    newChat,
    darkMode, // ✅ use global darkMode from context
  } = useContext(Context);

  const location = useLocation();
  const navigate = useNavigate();

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    if (location.pathname !== '/') {
      navigate('/');
    }
    await onSent(prompt);
  };

  return (
    <div className={`sidebar ${darkMode ? 'dark' : 'light'}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon || 'fallback-icon.png'}
          alt="Menu"
        />

        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon || 'fallback-icon.png'} alt="Plus Icon" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts && prevPrompts.length > 0 ? (
              prevPrompts.map((item, index) => (
                <div
                  onClick={() => loadPrompt(item)}
                  className="recent-entry"
                  key={index}
                >
                  <img
                    src={assets.message_icon || 'fallback-icon.png'}
                    alt="Message"
                  />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              ))
            ) : (
              <p>No recent prompts</p>
            )}
          </div>
        )}
      </div>

      <div className="bottom">
        <Link to="/image-generator" className="bottom-item recent-entry">
          <img
            src={assets.gallery_icon || 'fallback-icon.png'}
            alt="Gallery Icon"
          />
          {extended && <p>Image Generator</p>}
        </Link>

        <div className="bottom-item recent-entry">
          <img
            src={assets.question_icon || 'fallback-icon.png'}
            alt="Help Icon"
          />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img
            src={assets.history_icon || 'fallback-icon.png'}
            alt="History Icon"
          />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img
            src={assets.setting_icon || 'fallback-icon.png'}
            alt="Settings Icon"
          />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
