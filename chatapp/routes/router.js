import { Router } from "express";
const router = Router();

import { addToContactChatter , getMyContactsChatter ,checkandVerifyToken, loadMyProfile, checkUserStatus} from "../controllers/chatterbox.auth.js";
import { registerUser, loginUser, addNickName,deletUser, loadProfileDetails } from "../controllers/auth.controller.js";
import { createGroup, getUserGroups } from "../controllers/group.controller.js";


router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/addnickname", addNickName);
router.post("/delete", deletUser);
router.get("/profile", loadProfileDetails);
router.get("/myprofile", loadMyProfile);
router.post("/addcontact", addToContactChatter);
router.get("/mycontacts/:userId", getMyContactsChatter);
router.post("/creategroup", createGroup);
router.get("/my-groups", getUserGroups);
router.get("/checktoken", checkandVerifyToken);
router.get("/userstatus/:userId", checkUserStatus);

export default router;