
import React, { useContext, useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../../assets/default_image.svg";
import { Context } from "../../context/Context"; // ✅ context for darkMode

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const { darkMode } = useContext(Context); // ✅ using global dark mode

  const imageGenerator = async () => {
    const prompt = inputRef.current?.value;
    if (!prompt) return;

    setLoading(true);
    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({ prompt, n: 1, size: "512x512" }),
      });

      const data = await response.json();
      setImageUrl(data?.data?.[0]?.url || "/");
    } catch (error) {
      alert("Error generating image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`ai-image-generator ${darkMode ? "dark" : "light"}`}>
      <div className="header">
        GenAI <span>Studio</span>
      </div>

      <div className="img-loading">
        <img
          src={imageUrl === "/" ? default_image : imageUrl}
          alt="Generated AI"
        />
        <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
        <div className={loading ? "loading-text" : "display-none"}>
          Generating...
        </div>
      </div>

      <div className="search-box">
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Enter a prompt here"
        />
        <div className="generate-btn" onClick={imageGenerator}>
          Generate Image
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
