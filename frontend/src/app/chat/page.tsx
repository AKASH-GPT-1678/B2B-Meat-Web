"use client";
import { useAppSelector } from '@/utils/reduxhook';
import React from 'react';
import ChatBox from '../appcomponents/ChatBox';
export interface MessageData {
    sender?: string;
    text: string;
    date?: string;
    name?: string;
}

interface RequestData {
    accepted: boolean;
    createdAt: string;
    updatedAt: string;
    recieverId: string;
    senderId: string;
    senderName: string;
    __v: number;
    _id: string;
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

const Page = () => {
  
    return (

        <div>
            <ChatBox/>
        </div>
    )
};

export default Page;