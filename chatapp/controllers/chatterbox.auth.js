import { PrismaClient } from "@prisma/client";
import redisClient from "../configs/rediClient.js";
const prisma = new PrismaClient();

async function addToContactChatter(req, res) {


    try {


        const { userId, contactId } = req.body;
        console.log("Ravindra bhai jadeja")
        console.log(contactId, userId);

        const contact = await prisma.user.findFirst({
            where: {
                id: contactId
            }
        });
        console.log(contact);
        if (!contact) {
            return { verified: false, status: 404, message: `No User Found wih username ${contactId}` };
        };
        const existingContact = await prisma.contacts.findFirst({
            where: {
                OR: [
                    {
                        ownerId: userId,
                        contactId: contact.id,
                    },
                    {
                        ownerId: contact.id,
                        contactId: userId,
                    },
                ],
            },
        });

        if (existingContact) {
            return res.status(200).json({ message: "Contact Already Exists", contact: existingContact });
        }


        const createContact = await prisma.contacts.create({
            data: {
                ownerId: userId,
                contactId: contact.id
                ,



            },

        });



        return res.status(201).json({ message: "Contact Added", contact: createContact });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong", error: error });

    }

};
//accept request

async function acceptRequestChatter(req, res) {





    const { requestId } = req.body;

    try {
        const request = await prisma.contacts.findUniqueOrThrow({
            where: { id: requestId }
        });



        if (!request) {
            return res.status(404).json({ message: "Request Not Found" });
        };

        const updateContact = await prisma.contacts.update({
            where: {
                id: requestId

            },
            data: {
                accepted: true
            }

        })

        // if (!contact) {
        //     return res.status(404).json({ message: "Contact Not Found", contact: updateContact });
        // };


        return res.status(200).json({ message: "Request Accepted" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong", error: error });

    }

}
;
function flattenContact(contact) {
    return {
        id: contact.id,
        accepted: contact.accepted,
        createdAt: contact.createdAt,

        ownerId: contact.owner.id,
        ownerName: contact.owner.username,

        contactId: contact.contact.id,
        contactName: contact.contact.username
    };
}


async function checkForRequestChatter(req, res) {


    const { userId } = req.query;

    try {
        const request = await prisma.contacts.findMany({
            where: {
                OR: [
                    {
                        ownerId: userId,
                        accepted: false
                    },
                    {
                        contactId: userId,
                        accepted: false
                    }
                ]

            },
            include: {
                contact: true,
                owner: true
            }
        });
        const formatted = request.map(flattenContact);





        if (!request) {
            return res.status(200).json({ message: "No Request" })
        } else {

            return res.status(200).json({ success: true, data: formatted });
        };

    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong", error: error });

    }

};
async function getMyContactsChatter(req, res) {


    const { userId } = req.params;
    try {
        console.log("Request Recieved")
        const contacts = await prisma.contacts.findMany({
            where: {
                OR: [
                    {
                        ownerId: userId,
                        accepted: true
                    },
                    {
                        contactId: userId,
                        accepted: true
                    }
                ]
            },
            include: {
                contact: true,
                owner: true
            }
        });
        console.log("Hey i am working");

        const updatedOwner = contacts.map(item => [item.owner, item.contact]);
        console.log(updatedOwner);





        return res.status(200).json({ contacts: updatedOwner.flat().filter((item) => item.id !== userId) });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }

};

async function checkandVerifyToken(req, res) {
    if (!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };
    };

    if (req.user) {
        return res.status(200).json({ message: "Token is valid", verified: true });
    }

}

async function loadMyProfile(req, res) {


    try {
        if (!req.user) {
            return { verified: false, status: 401, message: "Unauthorized request" };
        };

        const email = req.user.email;
        const response = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        return res.status(200).json({ response: response, success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong", error: error });

    }

}
;
// Example Express route handler
async function checkUserStatus(req, res) {
    console.log("checkUserStatus called");
    try {
        // 1. Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({
                verified: false,
                status: 401,
                message: "Unauthorized request",
            });
        }

        const { userId } = req.params;
        console.log("Iam arived")

        if (!userId || typeof userId !== "string") {
            return res.status(400).json({
                verified: false,
                status: 400,
                message: "Invalid parameter: userId is required and must be a string",
            });
        }

        // 3. Check Redis
        const value = await redisClient.get(userId);

        if (value === null) {
            return res.status(200).json({
                verified: false,
                status: 200,
                message: `User with id "${userId}" does not exist`,
            });
        }


        return res.status(200).json({
            verified: true,
            status: 200,
            message: `User with id "${userId}" exists`,
        });
    } catch (error) {
        console.error("Error in checkUserStatus:", error);
        return res.status(500).json({
            verified: false,
            status: 500,
            message: "Internal server error",
        });
    }
}




export { addToContactChatter, acceptRequestChatter, checkForRequestChatter, getMyContactsChatter, checkandVerifyToken, loadMyProfile, checkUserStatus };
