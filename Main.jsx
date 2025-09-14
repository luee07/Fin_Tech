import React, { useContext } from "react";
import { Context } from "../fin/src/context/Context";
import assets from "../fin/src/assets";

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    return (
        <div className="main">
            <div className="nav">
                <p>Let`s Chat</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello Dev</span></p>
                            <p>How can I help you?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest some beautiful places for visiting in this city.</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly summaries the concept of urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}
                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type="text" 
                            placeholder="Search..." 
                            onKeyDown={(e) => { if (e.key === 'Enter') onSent(); }}
                        />
                        <div>
                            <label htmlFor="gallery-upload">
                                <img src={assets.gallery_icon} alt="" style={{cursor: 'pointer'}} />
                            </label>
                            <input 
                                id="gallery-upload" 
                                type="file" 
                                accept="image/*" 
                                style={{display: 'none'}} 
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = async (ev) => {
                                            const base64 = ev.target.result;
                                            await onSent(base64);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <img 
                                src={assets.mic_icon} 
                                alt="" 
                                style={{cursor: 'pointer'}} 
                                onClick={() => {
                                    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                                        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                                        const recognition = new SpeechRecognition();
                                        recognition.lang = 'en-US';
                                        recognition.interimResults = false;
                                        recognition.maxAlternatives = 1;
                                        recognition.onstart = () => {};
                                        recognition.onresult = (event) => {
                                            const transcript = event.results[0][0].transcript;
                                            setInput(transcript);
                                            onSent(transcript);
                                        };
                                        recognition.onerror = (event) => {
                                            if (event.error === 'not-allowed') {
                                                alert('Microphone access is blocked. Please allow mic access in your browser settings and reload the page.');
                                            } else {
                                                alert('Voice recognition error: ' + event.error);
                                            }
                                        };
                                        recognition.start();
                                    } else {
                                        alert('Speech recognition is not supported in this browser.');
                                    }
                                }}
                            />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}    
                        </div>
                    </div>
                    <p className="bottom-info">
                        © 2025 Let`s Chat. All rights reserved.
                        🔒 Secure & confidential |  Serving worldwide
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
