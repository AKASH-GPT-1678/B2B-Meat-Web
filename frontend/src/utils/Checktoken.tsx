import axios from "axios";

export async function checkToken(token: string) {
    try {
        const response = await axios.get('http://localhost:8080/auth/checkToken', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.status;
        
    } catch (error) {
        console.error(error);
        
    }
    
}