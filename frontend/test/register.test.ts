// tests/registerUser.test.ts
import { registerUser } from "@/lib/registerchat";
import chatClient from "@/lib/chatclient";

// ✅ Tell Jest to mock the chatClient module
jest.mock("@/lib/chatClient");

describe("registerUser", () => {
  const mockData = {
    username: "akash",
    email: "akash@example.com",
    fullName: "Akash Gupta",
    phone: "9876543210",
    password: "password123",
    app: "ChatApp"
  };

  const mockResponse = {
    success: true,
    message: "User registered successfully",
    user: { id: "1", username: "akash" }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register user successfully", async () => {
    // 🧠 Mock the chatClient.post method to return the mock response
    (chatClient.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    // 🧪 Call the function being tested
    const result = await registerUser(mockData);

    // ✅ Verify
    expect(chatClient.post).toHaveBeenCalledWith("/api/register", mockData);
 
    expect(result.success).toBe(true);
  });

  it("should throw error when API fails", async () => {
    (chatClient.post as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    await expect(registerUser(mockData)).rejects.toThrow("Network Error");
  });
});
