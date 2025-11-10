"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useAppSelector } from '@/utils/reduxhook';
import Image from 'next/image';
import CheckoutButton from '../appcomponents/CheckourButton';
import { email } from 'zod/v4-mini';
interface ProfileResponseDTO {
    id: string;
    email: string;
    username: string;
    profilePictureUrl: string;
    userSeller: boolean;
    premium: boolean;
    chat_Status: boolean;
}

const Settings = () => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [isFileSelected, setIsFileSelected] = React.useState(false);
    const [chnageName, setChangeName] = React.useState(false);
    const [thingtoChange, setThingtoChange] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [chatStatus, setChatstatus] = React.useState(true);
    const [profile, setProfile] = React.useState<ProfileResponseDTO | null>(null);
    const router = useRouter();
    const inputDiv = React.useRef<HTMLInputElement>(null);
    const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;
    const token = useAppSelector((state) => state.data.token);
    const isLoggedIn = useAppSelector((state) => state.data.isLoggedIn);

    const handleProfileChange = () => {
        inputDiv.current?.click();

    };

    const handleRemove = async () => {
        const defaultUrl = "https://res.cloudinary.com/dffepahvl/image/upload/v1754295798/pwoveg1fjurga2kudwk4.png";

        if (profile?.profilePictureUrl === defaultUrl) {
            alert("You can't remove the default profile picture");
            return;
        }

        try {
            const response = await axios.get(`${endpoint}/activity/profile/remove`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);

            alert("Profile image has been reset to default.");
            // Optional: refresh the profile data here if needed
        } catch (error) {
            console.error("Error removing profile image:", error);
            alert("Something went wrong while removing the profile image.");
        }
    };
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.put(`${endpoint}/activity/addProfileImage`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);

            alert("Profile image uploaded successfully.");
            // Optionally refresh the profile info here
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload image.");
        }
    };
    const handleEditClick = (field: string) => {
        setThingtoChange(field);
        setChangeName(true);
    };


    const handleFile = () => {
        if (inputDiv.current?.value) {
            setSelectedFile(inputDiv.current.files![0]);
            setIsFileSelected(true);
        }
    }

    const handleChatToggle = async (chatStatus: boolean) => {


        try {
            const endpoint = chatStatus ? "/chat/disable" : "/chat/enable";

            const res = await axios.get(`${endpoint}/activity${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert(res.data);
        } catch (err) {
            console.error("Error toggling chat status", err);
            alert("Something went wrong while toggling chat status");
        }
    };



    const toggleChatStatus = async (chatStatus: boolean) => {
        const isConfirmed = confirm("Are you sure you want to toggle chat status?");
        if(!isConfirmed) return;
        
        const payload = {
            email: profile?.email,
            username: profile?.username,
            password: profile?.id,
            app: "meat-web"

        };
        console.log(payload);
        const endpoint = chatStatus ? "api/delete" : "api/register";


        try {

            const response = await axios.post(`http://localhost:3001/${endpoint}`, payload, {

            });
            console.log(response.data);
            if (response.data.success == true) {
                await handleChatToggle(chatStatus);
                window.location.reload();

            }


        } catch (err) {
            console.error("Error toggling chat status", err);
            alert("Something went wrong while toggling chat status");
        }
    };

    React.useEffect(() => {
        const fetchProfile = async () => {
            if (!isLoggedIn || !token) {
                console.error('User is not logged in or token is missing.');
                router.push("/");
                return;
            }

            try {
                const response = await axios.get<ProfileResponseDTO>(`${endpoint}/auth/profile`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.info(response.data);
                setChatstatus(response.data.chat_Status);
                setProfile(response.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        };

        fetchProfile();
    }, [isLoggedIn, token, endpoint, router]);

    if (!profile) return <div className="p-4">Loading...</div>;


    return (
        <div className="w-full flex flex-row relative">
            <div className="w-[20%]"></div>
            <div className="mt-2 shadow-2xl flex flex-col w-[1200px] h-screen m-4 p-4">
                <div>
                    <h1 className="text-3xl font-bold font-sans mb-6">Your Profile</h1>
                </div>

                {/* Profile Picture and Actions */}
                <div className="flex flex-row justify-between">
                    <Image
                        src={profile.profilePictureUrl}
                        alt="profile"
                        width={200}
                        height={200}
                        className="rounded-full h-[50px] w-[50px] lg:w-[80px] lg:h-[80px] cursor-pointer object-cover"
                    />
                    <div className="space-x-2">
                        <Button className="cursor-pointer" onClick={handleRemove}>
                            Remove
                        </Button>
                        {isFileSelected ? (
                            <Button className="cursor-pointer" onClick={handleUpload}>
                                Upload
                            </Button>
                        ) : (
                            <Button className="cursor-pointer" onClick={handleProfileChange}>
                                Change
                            </Button>
                        )}
                        <input type="file" className="hidden" ref={inputDiv} onChange={handleFile} />
                    </div>
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
                        <p>{profile.email || "Not Provided"}</p>
                    </div>
                </div>
                <hr />

                {/* Account Type Section */}
                <div className="flex flex-row justify-between p-3 items-center">
                    <div className="border p-4 rounded-xl bg-white w-full max-w-md">
                        <p className="text-sm text-gray-500 font-medium mb-1">Type of Account</p>
                        <p
                            className={`text-lg font-semibold ${profile.userSeller ? "text-purple-600" : "text-green-600"
                                }`}
                        >
                            {profile.userSeller ? "Seller" : "Buyer"}
                        </p>
                    </div>
                    <div>
                        {!profile.userSeller && (
                            <Button onClick={() => router.push("/seller")} className="py-3 cursor-pointer min-h-[40px]">
                                Become a Seller
                            </Button>
                        )}
                    </div>
                </div>

                {/* Premium Section */}
                <div className="flex flex-row justify-between p-3 items-center">
                    <div className="border p-4 rounded-xl shadow-sm bg-white w-full max-w-md">
                        <p className="text-sm text-gray-500 font-medium mb-1">Premium Status</p>
                        <p
                            className={`text-lg font-semibold ${profile.premium ? "text-yellow-600" : "text-gray-600"
                                }`}
                        >
                            {profile.premium ? "Premium User" : "Free User"}
                        </p>
                    </div>
                    <div>{!profile.premium && <CheckoutButton />}</div>
                </div>


                <div className="flex flex-row justify-between p-4 mb-4">
                    <div>
                        <p className='text-sm'>Once you disabled chat your all previous chats will be lost</p>
                        <p className="font-bold">Chat Staus</p>
                        <div
                            onClick={() => toggleChatStatus(chatStatus)}
                            className={`${chatStatus ? "bg-emerald-400" : "bg-gray-200"
                                } h-[40px] w-[80px] rounded-2xl cursor-pointer mt-2`}
                        >
                            <div
                                className={`rounded-full h-[40px] bg-emerald-400 w-[40px] border-4 ${chatStatus ? "ml-auto border-amber-50" : "border-gray-400"
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
