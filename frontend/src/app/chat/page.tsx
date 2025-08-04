"use client";
import { useAppSelector } from '@/utils/reduxhook';
import React from 'react'
import { io, Socket } from "socket.io-client";
import { useRouter } from 'next/navigation';

export interface MessageData {
    sender?: string;
    text: string;
    date?: string;
    name?: string
};

const page = () => {
    const router = useRouter();
    const isSeller = useAppSelector((state) => state.data.isUserSeller);
    const [messages, setMessages] = React.useState<MessageData[]>([]);
    const [inputMessage, setInputMessage] = React.useState('');
    const [myUserId , setMyUserId] = React.useState('');
    const socketRef = React.useRef<Socket | null>(null);

    React.useEffect(() => {
        if (isSeller) {
            router.push("/sellerdashboard/inbox")
        }
    }, []);

    React.useEffect(() => {
        const socket = io("http://localhost:3001", {
            autoConnect: true, query: {
                userId: "100"
            }
        });
        socketRef.current = socket;

        const handleReceiveMessage = (data: MessageData) => {
            setMessages(prev => [...prev, data]);
        };

        socket.on("receive-message", handleReceiveMessage);

        return () => {
            socket.off("receive-message", handleReceiveMessage);
            socket.disconnect();
        };
    }, [isSeller]);

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;

        const payload = {
            senderId: "100",
            receiverId: "200",
            content: inputMessage,
            app: "meat-web"
        }

        socketRef.current?.emit("chat-message", payload);

     
        setMessages(prev => [...prev, {
            text: inputMessage,
            sender: "100",
            date: new Date().toLocaleTimeString()
        }]);

        setInputMessage('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 p-4'>
            <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-sm h-[80vh] flex flex-col'>

                {/* Chat Header */}
                <div className='border-b border-gray-200 p-4'>
                    <h2 className='text-lg font-semibold text-gray-800'>Chat</h2>
                </div>

     
                <div className='flex-1 overflow-y-auto p-4 space-y-3'>
                    {messages.length === 0 ? (
                        <div className='text-center text-gray-500 mt-20'>
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((message, index) => (
                            <div key={index} className={`flex ${message.sender === "100" ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === "100"
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-800'
                                    }`}>
                                    <p className='text-sm'>{message.text}</p>
                                    {message.date && (
                                        <p className={`text-xs mt-1 ${message.sender === "100" ? 'text-blue-100' : 'text-gray-500'
                                            }`}>
                                            {message.date}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Message Input */}
                <div className='border-t border-gray-200 p-4'>
                    <div className='flex gap-2'>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className='flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={inputMessage.trim() === ''}
                            className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page