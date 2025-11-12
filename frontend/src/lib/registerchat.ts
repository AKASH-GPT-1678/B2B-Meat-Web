import chatClient from "./chatclient";

interface RegisterData {

    email: string;
    username: string;
    password: string;
}
export interface RegisterResponse {
    success: boolean;
    message: string;
    user: any;
}


export async function registerUser(data: RegisterData): Promise<RegisterResponse> {
    try {
        const response = await chatClient.post("/api/auth/register", data);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}
