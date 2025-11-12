import { useAppSelector } from "./reduxhook";
export type InitialsD = {
    token: string | null;
    googleVerified: string | null;
    isPremium: boolean,
    isLoggedIn: boolean,
    isUserSeller: boolean,
    userId : string
    userEmail : string
}

const initialState: InitialsD = {
    token: null,
    googleVerified: null,
    isPremium: false,
    isLoggedIn: false,
    isUserSeller: false,
    userId : "",
    userEmail : ""
}
export const REDUX_VALS = () => {
    const token = useAppSelector((state) => state.data.token);
    const isPremium = useAppSelector((state) => state.data.isPremium);
    const isVerified = useAppSelector((state) => state.data.isLoggedIn);
    const isUserSeller = useAppSelector((state) => state.data.isUserSeller);
    const userId = useAppSelector((state) => state.data.userId);
    const userEmail = useAppSelector((state) => state.data.userEmail);
    

        return {
            token,
            isPremium,
            isVerified,
            isUserSeller,
            userId,
            userEmail

        }
}