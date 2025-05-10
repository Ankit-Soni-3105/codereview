import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { io as SocketIo } from 'socket.io-client'
import ReactMarkdown from 'react-markdown'
import { Editor } from '@monaco-editor/react'


const ProjectUi = () => {
    const navigate = useNavigate()

    const params = useParams()
    const [messages, setMessages] = useState([])
    const [inputs, setInputs] = useState("")
    const [socket, setSocket] = useState("")
    const [language, setLanguage] = useState("javascript")
    const [code, setCode] = useState("")
    const [review, setReview] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('code') // 'chat', 'code', or 'review'

    const handleEditorChange = (value) => {
        setCode(value)
        socket.emit("code-change", value)
    }

    function changeLanguage(newLanguage) {
        setLanguage(newLanguage)
    }

    function handleUserMessage() {
        setMessages((prev) => {
            return [...prev, inputs]
        })
        socket.emit("chat-message", inputs)
        setInputs("")
    }

    function getReview() {
        setIsLoading(true)
        socket.emit("get-review", code)
    }

    useEffect(() => {
        const io = SocketIo("https://ai-code-review-2xol.onrender.com", {
            query: {
                project: params.id
            }
        });

        io.emit("chat-history")

        io.on("chat-history", (messages) => {
            setMessages(messages.map((message) => {
                return message.text
            }))
        })

        io.on("chat-message", (message) => {
            setMessages((prev) => {
                return [...prev, message]
            })
        })

        io.on("code-change", (code) => {
            setCode(code)
        })

        io.emit("get-code")
        io.on("get-code", (code) => {
            setCode(code)
        })

        io.emit("get-review", code);
        io.on("code-review", (review) => {
            setReview(review)
            setIsLoading(false)
        })

        setSocket(io)
    }, []);

    return (
        <div className="h-screen p-3 bg-[#252529] relative">
            {/* Mobile Menu Icon */}
            <div className="lg:hidden fixed top-4 right-4 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-[#24CFA6] p-2 rounded-lg border-2 border-[#24CFA6]"
                >
                    <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
                </button>
            </div>



            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed top-16 right-4 bg-[#1F1F23] rounded-xl shadow-lg z-40 p-2">
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => {
                                setActiveSection('chat');
                                setIsMobileMenuOpen(false);
                            }}
                            className={`px-4 py-2 rounded ${activeSection === 'chat' ? 'bg-[#24CFA6] text-white' : 'text-[#24CFA6]'}`}
                        >
                            Chat
                        </button>
                        <button
                            onClick={() => {
                                setActiveSection('code');
                                setIsMobileMenuOpen(false);
                            }}
                            className={`px-4 py-2 rounded ${activeSection === 'code' ? 'bg-[#24CFA6] text-white' : 'text-[#24CFA6]'}`}
                        >
                            Code
                        </button>
                        <button
                            onClick={() => {
                                setActiveSection('review');
                                setIsMobileMenuOpen(false);
                            }}
                            className={`px-4 py-2 rounded ${activeSection === 'review' ? 'bg-[#24CFA6] text-white' : 'text-[#24CFA6]'}`}
                        >
                            Review
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className={`px-4 py-2 rounded ${activeSection === 'review' ? 'bg-[#24CFA6] text-white' : 'text-[#24CFA6]'}`}>
                            Go Back Room
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between h-full gap-4">
                {/* Chat Section */}
                <div className={`${activeSection === 'chat' ? 'block h-[calc(100vh-2rem)]' : 'hidden'} lg:block lg:h-full w-full lg:w-[32.5lvw] rounded-2xl bg-[#1F1F23] relative`}>
                    <div className="messages absolute rounded-xl h-[calc(100%-80px)] overflow-y-auto">
                        {messages.length == 0 ?
                            <div className='text-white text-xl'>
                                ...
                            </div>
                            : <div className="message">
                                {messages.map((message, idx) => (
                                    <span key={idx} className='font-bold text-md bg-[#24CFA6] block mb-2 p-2 rounded'>
                                        {message}
                                    </span>
                                ))}
                            </div>}
                    </div>
                    <div className="input-area absolute p-[0.8rem] bottom-[1rem] left-2 right-2 rounded-2xl border-2 border-[#24CFA6] flex items-center justify-center">
                        <input
                            className='px-[0.7rem] py-[0.rem] w-full outline-none text-xl bg-transparent text-white'
                            type="text"
                            onChange={(e) => setInputs(e.target.value)}
                            value={inputs}
                            placeholder='message to Projects....'
                        />
                        <button>
                            <i onClick={handleUserMessage}
                                className="ri-send-plane-2-line px-[0.7rem] py-[0.rem] w-full outline-none text-xl cursor-pointer text-[#24CFA6]">
                            </i>
                        </button>
                    </div>
                </div>

                {/* Code Section */}
                <div className={`${activeSection === 'code' ? 'block h-[calc(100vh-2rem)]' : 'hidden'} lg:block lg:h-full w-full lg:w-[32.5lvw] rounded-2xl bg-[#1F1F23]`}>
                    <div className="language-selector rounded-2xl p-2">
                        <select
                            value={language}
                            onChange={(e) => changeLanguage(e.target.value)}
                            className="bg-[#1F1F23] text-[#24CFA6] p-2 rounded-lg border border-[#24CFA6] outline-none"
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="typescript">TypeScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="csharp">C#</option>
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                        </select>
                    </div>
                    <div className="h-[calc(100%-60px)]">
                        <Editor
                            height="100%"
                            width="100%"
                            language={language}
                            value={code}
                            onChange={handleEditorChange}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: true },
                                fontSize: 14,
                                wordWrap: 'on',
                                automaticLayout: true,
                                formatOnType: true,
                                formatOnPaste: true,
                                cursorBlinking: "smooth",
                            }}
                        />
                    </div>
                </div>

                {/* Review Section */}
                <div className={`${activeSection === 'review' ? 'block h-[calc(100vh-2rem)]' : 'hidden'} lg:block lg:h-full w-full lg:w-[32.5lvw] rounded-2xl bg-[#1F1F23] p-4 relative`}>
                    <div className="review-content text-xl flex flex-wrap flex-col text-white h-[calc(100%-60px)] overflow-y-auto">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#24CFA6]"></div>
                            </div>
                        ) : review ? (
                            <ReactMarkdown>{review}</ReactMarkdown>
                        ) : (
                            <div className="text-gray-400">Click 'Get Review' to analyze your code</div>
                        )}
                    </div>
                    <button
                        onClick={getReview}
                        className='absolute cursor-pointer px-8 py-2 bottom-5 left-1/2 transform -translate-x-1/2 rounded-xl border-2 border-[#24CFA6] text-[#24CFA6]'>
                        Get Review
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectUi