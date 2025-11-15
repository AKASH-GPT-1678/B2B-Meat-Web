import chatClient from "./chatclient";
import { io, Socket } from "socket.io-client";

type SendMessageOptions = {
    endpoint: string;
    userId: string;
    sellerId: string;

};


export async function sendMessageOnce({
    endpoint,
    userId,
    sellerId,

}: SendMessageOptions) {
    return new Promise((resolve, reject) => {
        const socket: Socket = io(endpoint, {
            autoConnect: false,      // manual connect
            reconnection: false,     // optional
            query: {
                userId : userId,
            }

        });
        if (!userId || !sellerId) {
            reject(new Error('Missing parameters'));
        };

        // Connect manually
        socket.connect();

        // On connection
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);

            // Send your message
            socket.emit("new-chat", userId + '&' + sellerId, (ack: any) => {
                console.log("Server acknowledged:", ack);

                // Clean disconnect
                socket.disconnect();

                resolve(ack);
            });
        });


        socket.on("connect_error", (err) => {
            console.error("Connection error:", err.message);
            socket.disconnect();
            reject(err);
        });
    });
}
