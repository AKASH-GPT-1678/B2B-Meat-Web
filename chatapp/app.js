import express from 'express';
const app = express();
import decodeToken from './middlewares/checkTokenMiddleware.js';
import cors from 'cors';
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import redisClient from './configs/rediClient.js';
import router from './routes/router.js';
import "./configs/mongClient.js";
import { checkPendingMessagesPG, saveMessagePG, updateStatusPG } from './controllers/message.controller.js';
import { createNewContact } from './controllers/chatterbox.auth.js';
dotenv.config();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // must be specific, not "*"
    credentials: true, // allow cookies / tokens
}));
app.use(decodeToken);
app.use("/api", router);
io.on('connection', (socket) => {
    const { userId } = socket.handshake.query;
    console.log(`User ${userId} connected`);
    socket.userId = userId;

    // JOIN USER TO THEIR OWN ROOM - This is crucial!
    socket.join(userId);

    redisClient.set(userId, "Online");

    // Check for pending messages
    const checkAndSendPending = async () => {
        const messages = await checkPendingMessagesPG(userId);
        if (messages && messages.length > 0) {
            socket.emit(userId, messages);
            await updateStatusPG(userId);
        }
    };
    checkAndSendPending();
    socket.on('new-chat', async (data) => {
        const [userId, sellerId] = data.split('&');
        const result = await createNewContact(userId, sellerId);
        socket.emit('new-chat', result);
    });

    socket.on('chat-message', async (msg) => {
        try {
            const getStatus = await redisClient.get(msg.receiverId);

            if (getStatus) {
                console.log(msg);

                const newMessage = {
                    senderId: msg.senderId,
                    groupId: "na",
                    receiverId: msg.receiverId,
                    content: msg.content,
                    timestamp: new Date()
                };

                io.to(msg.receiverId).emit(msg.receiverId, newMessage);

                await saveMessagePG(msg.senderId, msg.receiverId, msg.content, "na", "SUCCESS", msg.app);

                socket.emit('message-sent', { success: true, message: newMessage });
            } else {
                console.log(msg);

                await saveMessagePG(msg.senderId, msg.receiverId, msg.content, "na", "PENDING", msg.app);
                socket.emit('message-sent', { success: true, pending: true });
            }
        } catch (error) {
            console.error('Error handling chat message:', error);
            socket.emit('message-error', { error: 'Failed to send message' });
        }
    });

    

    socket.on('typing', (data) => {
        // Emit typing indicator to receiver
        io.to(data.receiverId).emit('user-typing', {
            senderId: data.senderId,
            isTyping: data.isTyping
        });
    });

    socket.on('disconnect', async () => {
        console.log(`User ${socket.userId} disconnected`);
        await redisClient.del(socket.userId);
    });
});


app.get("/", (req, res) => {
    res.send("Hello World!");
});




export default server;