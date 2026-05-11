"use client";
import ChatBox from '../appcomponents/ChatBox';
export interface MessageData {
    sender?: string;
    text: string;
    date?: string;
    name?: string;
}



const Page = () => {
  
    return (

        <div>
            <ChatBox/>
        </div>
    )
};

export default Page;