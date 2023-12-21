import { Router } from "express";
const router = Router();
import * as userFuncs from "../data/users.js";
import * as dateFuncs from "../data/dates.js";
import * as helpers from "../data/helpers.js";
import { users } from "../config/mongoCollections.js";
import security from "../middlewares/security.js";

router.route("/me").get(security.checkAuth, async (req, res) => {
  let id = req.user.uid;
  try {
    let user = await userFuncs.get(id);
    // console.log(user);
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.route("/signup").post(async (req, res) => {
  let userInfo = req.body;
  if (!userInfo || Object.keys(userInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  let id = userInfo.id;
  let firstName = userInfo.firstName;
  let lastName = userInfo.lastName;
  let username = userInfo.username;
  let email = userInfo.email;

  try {
    id = helpers.checkUserId(id, "ID");
    firstName = helpers.checkName(firstName, "First Name");
    lastName = helpers.checkName(lastName, "Last Name");
    email = helpers.checkEmail(email, "Email");
    username = helpers.checkUsername(username, "Username");

    const usersCollection = await users();
    let userExists = await usersCollection.findOne({ email: email });
    if (userExists) {
      throw `User with that email (${email}) already exists!`;
    }
    const usernameExists = await usersCollection.findOne({
      username: username,
    });
    if (usernameExists) {
      throw `User with that username (${username}) already exists!`;
    }
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  try {
    let newUser = await userFuncs.create(
      id,
      firstName,
      lastName,
      email,
      username
    );
    return res.status(200).json(newUser);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.route("/checkUsernames/:username").get(async (req, res) => {
  let username = req.params.username;
  try {
    username = helpers.checkUsername(username, "Username");
    let exists = await userFuncs.checkForUsername(username);
    return res.status(200).json({ exists: exists });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
});

router.route("/checkEmails/:email").get(async (req, res) => {
  let email = req.params.email;
  try {
    email = helpers.checkEmail(email, "Email");
    let exists = await userFuncs.checkForEmail(email);
    return res.status(200).json({ exists: exists });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
});

router
  .route("/user/:id")
  .get(async (req, res) => {
    let id = req.params.id;

    try {
      id = helpers.checkUserId(id, "User ID");
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      let user = await userFuncs.get(id);
      return res.status(200).json(user);
    } catch (e) {
      if (e === `No User with that ID (${id})`) {
        return res.status(404).json({ error: e });
      } else {
        return res.status(500).json({ error: e });
      }
    }
  })
  .post(async (req, res) =>{
    let userInfo = req.body;
    if (!userInfo || Object.keys(userInfo).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }
    let id = req.params.id;
    let url = userInfo.url;

    try {
      // id = helpers.checkId(id, "ID");
      url = helpers.checkString(url, "Profile Pic Url");
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    let user;
    try {
      user = await userFuncs.get(id);
    } catch (e) {
      if (e === `No User with that ID (${id})`) {
        return res.status(404).json({ error: e });
      } else {
        return res.status(500).json({ error: e });
      }
    }

    try {
      let updatedUser = await userFuncs.updatePhoto(id,url);
      return res.status(200).json(updatedUser);
    } catch (e){
      return res.status(500).json({error: e})
    }
  })
  .patch(async (req, res) => {
    let userInfo = req.body;
    let id = req.params.id;

    try {
      id = helpers.checkUserId(id, "ID");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    let user;

    try {
      user = await userFuncs.get(id);
    } catch (e) {
      return res.status(404).json({ error: e });
    }

    if (!userInfo || Object.keys(userInfo).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }

    let firstName = userInfo.firstName;
    let lastName = userInfo.lastName;
    let username = userInfo.username;

    try {
      firstName = helpers.checkName(firstName, "First Name");
      lastName = helpers.checkName(lastName, "Last Name");
      username = helpers.checkUsername(username, "Username");
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      let updatedUser = await userFuncs.update(
        id,
        firstName,
        lastName,
        username
      );
      return res.status(200).json(updatedUser);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    let id = req.params.id;

    try {
      id = helpers.checkUserId(id, "ID");
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      let user = await userFuncs.get(id);
    } catch (e) {
      if (e === `No User with that ID (${id})`) {
        return res.status(404).json({ error: e });
      } else {
        return res.status(500).json({ error: e });
      }
    }

    try {
      let deletedUser = await userFuncs.remove(id);
      return res.status(200).json(deletedUser);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });
  
router
  .route("/user/:userId/like/:dateId")
  .post(async (req, res) => {
    let userId = req.params.userId;
    let dateId = req.params.dateId;

    try {
      userId = helpers.checkUserId(userId, "User ID");
      dateId = helpers.checkId(dateId, "Date ID");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    let user;
    let date;
    try {
      user = await userFuncs.get(userId);
      date = await dateFuncs.getDate(dateId);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
    let likedDates = user.likedDates;

    try {
      if (likedDates.includes(dateId.toString())) {
        throw `User (${userId}) already liked that date (${dateId})`;
      }
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      let { success } = await userFuncs.likeADate(userId, dateId);
      return res.status(200).json({ success: success });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    let userId = req.params.userId;
    let dateId = req.params.dateId;

    try {
      userId = helpers.checkUserId(userId, "User Id");
      dateId = helpers.checkId(dateId, "Date Id");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    let user;
    let date;

    try {
      user = await userFuncs.get(userId);
      date = await dateFuncs.getDate(dateId);
    } catch (e) {
      return res.status(404).json({ error: e });
    }

    let likedDates = user.likedDates;

    try {
      if (!likedDates.includes(dateId.toString())) {
        throw `User (${userId}) has not liked Date (${dateId})`;
      }
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      let { success } = await userFuncs.unlikeADate(userId, dateId);
      return res.status(200).json({ success: success });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });
router
  .route("/user/:userId/date/:dateId")
  .post(async (req, res) => {
    let userId = req.params.userId;
    let dateId = req.params.dateId;

    try {
      userId = helpers.checkUserId(userId, "User Id");
      dateId = helpers.checkId(dateId, "Date Id");
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    let user;
    let date;

    try {
      user = await userFuncs.get(userId);
      date = await dateFuncs.getDate(dateId);
    } catch (e) {
      return res.status(404).json({ error: e });
    }

    let userDates = user.dates;

    try {
      if (userDates.includes(dateId)) {
        throw `User (${userId}) already added that date (${dateId})`;
      }
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      let addInfo = await userFuncs.addDate(userId, dateId);
      return res.status(200).json(addInfo);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    let userId = req.params.userId;
    let dateId = req.params.dateId;

    try {
      userId = helpers.checkUserId(userId, "User Id");
      dateId = helpers.checkId(dateId, "Date Id");
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    let user;
    let date;

    try {
      user = await userFuncs.get(userId);
      date = await dateFuncs.getDate(dateId);
    } catch (e) {
      return res.status(404).json({ error: e });
    }

    let userDates = user.dates;

    try {
      if (!userDates.includes(dateId)) {
        throw `User (${userId}) did not create that date (${dateId})`;
      }
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      let deleteInfo = await userFuncs.removeDate(userId, dateId);
      return res.status(200).json(deleteInfo);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

export default router;
