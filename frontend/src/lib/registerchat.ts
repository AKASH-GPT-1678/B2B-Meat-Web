import { email } from "zod/v4-mini";
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
  const data2 = {
    ...data,
    email : "kunalsingh123@gmail.com",
    app: "B2BMEATWEB"   // ✅ adding or overriding `app` field before sending
  };

  try {
    const response = await chatClient.post("/api/register", data2);
    console.log(response.data); // ✅ optional — good for debugging
    return response.data;       // ✅ returns the backend response directly
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // ✅ re-throw to let caller handle it
  }
}
