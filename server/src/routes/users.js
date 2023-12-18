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
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

// Do we actually need this????
// router.route("/").get(async (req, res) => {
//   try {
//     let allUsers = await userFuncs.getAll();
//     return res.status(200).json(allUsers);
//   } catch (e) {
//     return res.status(500).json({ error: e });
//   }
// });

router.route("/signup").post(async (req, res) => {
  let userInfo = req.body;
  if (!userInfo || Object.keys(userInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  let id = userInfo.id; //ADD VALIDATION FOR THIS!!!!!
  let firstName = userInfo.firstName;
  let lastName = userInfo.lastName;
  let username = userInfo.username; //ADD VALIDATION FOR THIS!!!!!
  let email = userInfo.email;
  let password = userInfo.password;

  try {
    //VALIDATE FIELDS
    firstName = helpers.checkName(firstName, "First Name");
    lastName = helpers.checkName(lastName, "Last Name");
    email = helpers.checkEmail(email, "Email");
    password = helpers.checkPassword(password, "Password");

    const usersCollection = await users();
    let userExists = await usersCollection.findOne({ email: email });
    if (userExists) {
      throw `User with that email (${email}) already exists!`;
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
      username,
      password
    );
    return res.status(200).json(newUser);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router
  .route("/user/:id")
  .get(async (req, res) => {
    let id = req.params.id;

    try {
      // id = helpers.checkId(id, "ID");
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
  .patch(async (req, res) => {
    let userInfo = req.body;
    let id = req.params.id;

    try {
      id = helpers.checkId(id, "ID");
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    const usersCollection = await users();
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
    let password = userInfo.password;

    if (!firstName) {
      firstName = user.firstName;
    }

    if (!lastName) {
      lastName = user.lastName;
    }

    if (!password) {
      password = user.password;
    }

    try {
      firstName = helpers.checkName(firstName, "First Name");
      lastName = helpers.checkName(lastName, "Last Name");
      password = helpers.checkPassword(password, "Password");
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      let updatedUser = await userFuncs.update(
        id,
        firstName,
        lastName,
        password
      );
      return res.status(200).json(updatedUser);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    let id = req.params.id;

    try {
      id = helpers.checkId(id, "ID");
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
      userId = helpers.checkId(userId, "User ID");
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
      if (likedDates.includes(dateId)) {
        throw `User (${userId}) already liked that date (${dateId})`;
      }
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      let addInfo = await userFuncs.addLikedDate(userId, dateId);
      return res.status(200).json(addInfo);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    let userId = req.params.userId;
    let dateId = req.params.dateId;

    try {
      userId = helpers.checkId(userId, "User Id");
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
      if (!likedDates.includes(dateId)) {
        throw `User (${userId}) has not liked Date (${dateId})`;
      }
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      let deleteInfo = await userFuncs.removeLikedDate(userId, dateId);
      return res.status(200).json(deleteInfo);
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
      userId = helpers.checkId(userId, "User Id");
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
      userId = helpers.checkId(userId, "User Id");
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
