import React, { useContext, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    darkMode,
    setDarkMode,
  } = useContext(Context); // ✅ use global context

  // ✅ Apply or remove dark class based on toggle
  useEffect(() => {
    const mainDiv = document.querySelector('.main');
    if (darkMode) {
      mainDiv.classList.add('dark');
    } else {
      mainDiv.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim() && !loading) {
      onSent();
    }
  };

  return (
    <div className="main">
      {/* Top Navbar */}
   
      <div className="nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
  {/* <p style={{ color: darkMode ? 'white' : 'black', fontWeight: 'bold', fontSize: '28px' }}>
  DevBot
</p> */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <img
      src={assets.gemini_icon}
      alt="Gemini Icon"
      style={{ width: '32px', height: '32px' }}
    />
    <p style={{ color: darkMode ? 'white' : 'black', fontWeight: 'bold', fontSize: '28px', margin: 0 }}>
      DevBot
    </p>
  </div>

  
  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
  
    <button
      className="dark-mode-toggle"
      onClick={() => setDarkMode((prev) => !prev)}
      aria-label="Toggle dark mode"
      style={{ background: 'none', border: 'none', color: darkMode? 'white' : "#333", fontSize: '18px', cursor: 'pointer' }}
    >
      {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>

    <img
      src={assets.user_icon}
      alt="User Icon"
      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
    />
  </div>
</div>


      {/* Main Content */}
      <div
        className="main-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {!showResult ? (
          <div className="greet">
            <p>
              <span>Hello, Dev</span>
            </p>
            <p>What would you like to do today?</p>
          </div>
        ) : (
          <div className="result">
            {/* Prompt Display */}
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>

            {/* Gemini Response */}
<div className="result-data">
  <img src={assets.gemini_icon} alt="Gemini Icon" />
  {loading ? (
    <div className="loader">
      <hr />
      <hr />
      <hr />
    </div>
  ) : (
   <div className="response-block">
  <p dangerouslySetInnerHTML={{ __html: resultData }} />
</div>

  )}
</div>
          </div>
        )}

        {/* Input Section */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              aria-label="Enter your prompt"
            />

            <div className="search-icons">
              <img
                src={assets.gallery_icon}
                alt="Gallery"
                aria-label="Upload Image"
              />
              <img src={assets.mic_icon} alt="Mic" aria-label="Voice Input" />
              {input && (
                <img
                  src={assets.send_icon}
                  alt="Send"
                  onClick={onSent}
                  aria-label="Send Prompt"
                  className="send-icon"
                />
              )}
            </div>
          </div>
          <p className="accuracy-warning">
              AI responses are generated automatically and may contain errors.
             Please verify any critical information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
