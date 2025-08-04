"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useAppSelector } from '@/utils/reduxhook';

interface ProfileResponseDTO {
    id: string;
    email: string;
    username: string;
    profilePictureUrl: string;
    isUserSeller: boolean;
    isPremium: boolean;
}

const Settings = () => {
    const [chnageName, setChangeName] = React.useState(false);
    const [thingtoChange, setThingtoChange] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [profileStatus, setProfileStatus] = React.useState(false);
    const [profile, setProfile] = React.useState<ProfileResponseDTO | null>(null);
    const router = useRouter();
    const inputDiv = React.useRef<HTMLInputElement>(null);
    const Key_Url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const token = useAppSelector((state) => state.data.token);
    const isLoggedIn = useAppSelector((state) => state.data.isLoggedIn);

    const handleProfileChange = () => {
        inputDiv.current?.click();
    };

    const handleEditClick = (field: string) => {
        setThingtoChange(field);
        setChangeName(true);
    };

    React.useEffect(() => {
        const fetchProfile = async () => {
            if (!isLoggedIn || !token) {
                console.error('User is not logged in or token is missing.');
                router.push("/");
                return;
            }

            try {
                const response = await axios.get<ProfileResponseDTO>(`${Key_Url}/auth/profile`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.info(response.data);
                setProfile(response.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        };

        fetchProfile();
    }, [isLoggedIn, token, Key_Url, router]);

    if (!profile) return <div className="p-4">Loading...</div>;

    return (
        <div className="w-full flex flex-row relative">
            <div className="w-[20%]"></div>
            <div className="mt-2 shadow-2xl flex flex-col w-[1200px] h-screen m-4 p-4">
                <div>
                    <h1 className="text-3xl font-bold font-sans mb-6">Your Profile</h1>
                </div>
                

                {/* Name Section */}
                <div className="flex flex-row justify-between p-4 mb-4">
                    <div>
                        <p className="font-bold">Name</p>
                        <p>{profile.username}</p>
                        {chnageName && thingtoChange === "name" && (
                            <div className="flex flex-row mt-3 gap-1">
                                <Input type="text" placeholder="Enter New Name" className="w-[250px] h-[40px]" />
                                <Button className="h-[40px] bg-black text-white cursor-pointer">Add</Button>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center">
                        <Button
                            className="border cursor-pointer font-bold mr-6"
                            onClick={() => handleEditClick("name")}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
                <hr />

                {/* Email Section */}
                <div className="flex flex-row justify-between p-4 mb-4">
                    <div>
                        <p className="font-bold">Email</p>
                        <p>{profile.email}</p>
                    </div>
                </div>
                <hr />

                {/* Phone Section */}
                <div className="flex flex-row justify-between h-[200px]">
                    <div className="flex flex-col justify-between p-4 mb-4 mt-3">
                        <p className="font-bold">Phone Number</p>
                        <p>{contact || "Not Provided"}</p>
                        {thingtoChange === "Contact" && (
                            <div className="flex flex-row mt-3 gap-1">
                                <Input
                                    type="text"
                                    placeholder="Enter New Contact"
                                    onChange={(e) => setContact(e.target.value)}
                                    minLength={10}
                                    maxLength={10}
                                    className="w-[250px] h-[40px]"
                                />
                                <Button className="h-[40px] bg-black text-white cursor-pointer">Add</Button>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center mr-5">
                        <Button
                            className="border cursor-pointer font-bold mr-6"
                            onClick={() => handleEditClick("Contact")}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
                <hr />

                {/* Job Profile Toggle */}
                <div className="flex flex-row justify-between p-4 mb-4">
                    <div>
                        <p className="font-bold">Job Profile</p>
                        <div
                            onClick={() => setProfileStatus(!profileStatus)}
                            className={`${
                                profileStatus ? 'bg-emerald-400' : 'bg-gray-200'
                            } h-[40px] w-[80px] rounded-2xl cursor-pointer mt-2`}
                        >
                            <div
                                className={`rounded-full h-[40px] bg-emerald-400 w-[40px] border-4 ${
                                    profileStatus ? 'ml-auto border-amber-50' : 'border-gray-400'
                                }`}
                            ></div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default Settings;
