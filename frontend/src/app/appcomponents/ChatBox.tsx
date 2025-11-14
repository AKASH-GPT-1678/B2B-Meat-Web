"use client";
import { useAppSelector } from '@/utils/reduxhook';
import React from 'react';
import { io, Socket } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { ImCross } from 'react-icons/im';
import { TiTickOutline } from 'react-icons/ti';
import chatClient from '@/lib/chatclient';
import { useSearchParams } from 'next/navigation';
import { useReduxVals } from '@/utils/reduxVals';
import { makeRequest } from '@/lib/chatrequest';
import { acceptRequest } from '@/lib/chatrequest';
export interface MessageData {
    sender?: string;
    text: string;
    date?: string;
    name?: string;
}

interface RequestData {
    id: string;
    accepted: boolean;
    createdAt: string | Date;

    ownerId: string;
    ownerName: string;

    contactId: string;
    contactName: string;
}

interface Contact {
    accepted: boolean;
    contactUserId: string;
    createdAt: string;
    userId: string;
    username: string;
    __v: number;
    _id: string;
}

const ChatBox = () => {

    const userEmail = useAppSelector((state) => state.data.userEmail);
    const [messages, setMessages] = React.useState<MessageData[]>([]);
    const [inputMessage, setInputMessage] = React.useState('');
    const [requests, setRequests] = React.useState<RequestData[]>([]);
    const [contacts, setContacts] = React.useState<Contact[]>([]);
    const [addChat, setAddChat] = React.useState('');
    const [activeChatId, setActiveChatId] = React.useState<string | null>(null);
    const [showNewChat, setShowNewChat] = React.useState(false);
    const socketRef = React.useRef<Socket | null>(null);
    const chatEndpoint = process.env.NEXT_PUBLIC_CHAT_URL;
    const searchParams = useSearchParams();
    const chatId = searchParams.get('chatId');
    const { token, userId: myUserId, isPremium } = useReduxVals();




    React.useEffect(() => {
        console.log(chatEndpoint);
        const socket = io(chatEndpoint?.toString(), {
            autoConnect: true,
            query: { userId: myUserId },
        });
        socketRef.current = socket;

        const handleReceiveMessage = (data: MessageData) => {
            setMessages((prev) => [...prev, data]);
        };

        socket.on('receive-message', handleReceiveMessage);

        return () => {
            socket.off('receive-message', handleReceiveMessage);
            socket.disconnect();
        };
    }, [myUserId]);

    React.useEffect(() => {
        const checkForRequests = async () => {
            try {
                const response = await chatClient.get(`/api/checkrequest?userId=${myUserId}`);
                console.log(response.data);
                setRequests(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getContacts = async () => {
            if (!myUserId) return;
            try {
                console.log("Fetching contacts for user ID:", myUserId);
                const response = await chatClient.get(`/api/mycontacts/${myUserId}`);
                console.log(response.data.contacts);
                setContacts(response.data.contacts);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };



        checkForRequests();
        getContacts();
    }, [userEmail, myUserId]);
    const exists = contacts.some(contact => contact.contactUserId === chatId);



    return (
        <div className="min-h-screen p-4 bg-gray-100">
            {exists ? null : <Button onClick={() => makeRequest(myUserId, chatId as string)}>New Request</Button>}
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4">

                <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-sm p-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Contacts</h2>
                        <button
                            onClick={() => setShowNewChat(!showNewChat)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                        >
                            {showNewChat ? 'Close' : 'New Chat'}
                        </button>
                    </div>

                    {showNewChat && (
                        <div className="space-y-2">
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                placeholder="Enter username"
                                onChange={(e) => setAddChat(e.target.value)}
                            />
                            {/* <button
                                onClick={addNewChat}
                                className="w-full bg-blue-600 text-white py-2 rounded"
                            >
                                Add
                            </button> */}
                        </div>
                    )}

                    <div className="space-y-2">
                        {contacts.map((contact) => (
                            <div
                                key={contact._id}
                                onClick={() => setActiveChatId(contact.contactUserId)}
                                className={`p-2 border rounded-lg cursor-pointer ${activeChatId === contact.contactUserId ? 'bg-blue-100' : 'bg-white'
                                    }`}
                            >

                                {contact.username}
                            </div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <h3 className="font-semibold">Incoming Requests</h3>
                        {requests && requests.length > 0 ? (
                            requests.map((request) => (
                                <div key={request.id} className="flex items-center justify-between p-2 border rounded">
                                    <div>
                                        <p className="text-sm font-medium">{request.ownerName}</p>
                                        <p className="text-xs text-gray-500">{request.contactId}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <ImCross size={20} fill="red" className="cursor-pointer" />
                                        <TiTickOutline
                                            size={26}
                                            fill="green"
                                            className="cursor-pointer"
                                        onClick={() => makeRequest(myUserId, request.id)}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400">No Requests</p>
                        )}
                    </div>
                </div>

                {/* Chat Section */}
                <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-sm flex flex-col h-[80vh]">
                    <div className="border-b p-4 font-semibold">Chat</div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.length === 0 ? (
                            <div className="text-center text-gray-500 mt-20">
                                <p>{myUserId}</p>
                                <p>{activeChatId}</p>
                                <p>No messages yet. Start the conversation!</p>
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <div key={index} className={`flex ${message.sender === myUserId ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === myUserId
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-800'
                                            }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                        {message.date && (
                                            <p
                                                className={`text-xs mt-1 ${message.sender === myUserId ? 'text-blue-100' : 'text-gray-500'
                                                    }`}
                                            >
                                                {message.date}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="border-t p-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}

                                placeholder="Type your message..."
                                className="flex-1 border rounded px-4 py-2 focus:outline-none"
                            />
                            <button

                                disabled={!inputMessage.trim()}
                                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;