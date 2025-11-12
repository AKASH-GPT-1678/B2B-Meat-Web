
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

// import apiClient from "@/lib/axios";
// import { success } from "zod/v4-mini";
// async function testAPI() {
//     const response = await apiClient.get('/auth/welcome');

//     return response.data;
    
// };


// describe("testAPI()", () => {
//   it("should return data from /auth/welcome endpoint", async () => {
//     // Create a mock Axios adapter
//     const mock = new MockAdapter(apiClient);

//     // Mock response
//     const mockData = { message: "Welcome! This endpoint is accessible to everyone." };
//     mock.onGet("/auth/welcome").reply(200, mockData);

//     // Call your function
//     const result = await testAPI();

//     // Assertions
//     expect(result).toEqual(mockData);

//     // Clean up mock
//     mock.restore();
//   });
// });
