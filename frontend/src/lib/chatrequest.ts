import chatClient from "./chatclient";
export const makeRequest = async (userId: string, contactId: string) => {
    try {
        const response = await chatClient.post('/api/addcontact', { userId: userId, contactId: contactId });
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};
export const acceptRequest = async (userId: string, requestId: string) => {
    try {
        const response = await chatClient.post('/api/acceptrequest', { userId: userId, requestId: requestId });
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};