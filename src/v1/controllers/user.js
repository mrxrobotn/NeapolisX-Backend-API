import User from "../models/user.js";


export function addUser(req, res) {
    User.create({
      epicGamesId: req.body.epicGamesId,
      name: req.body.name,
      email: req.body.email,
      events: req.body.events,
      sessions: req.body.sessions,
      room: req.body.room,
      canAccess: req.body.canAccess,
      isAuthorized: req.body.isAuthorized,
      role: req.body.role,
    })
      .then(() => {
        res.status(200).json({
          epicGamesId: req.body.epicGamesId,
          name: req.body.name,
          email: req.body.email,
          events: req.body.events,
          sessions: req.body.sessions,
          room: req.body.room,
          canAccess: req.body.canAccess,
          isAuthorized: req.body.isAuthorized,
          role: req.body.role,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
}

export function getUser(req, res) {
    User.findOne({ "epicGamesId": req.params.epicGamesId })
      .then((doc) => {
        if (doc != null) {
          res.status(200).json(doc);
        } else {
          res.status(500).json({error: "user not found"});
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
}

export function getUserById(req, res) {
  User.findById(req.params._id)
  .then((doc) => {
    if (doc != null) {
      var response = doc;
      res.status(200).json(response);
    } else {
      res.status(500).json({ error: "id not found" });
    }
  })
  .catch((err) => {
    res.status(500).json({ error: err });
  });
}

export function deleteUser(req, res) {
  User.deleteOne({ "epicGamesId": req.params.epicGamesId })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getUsers(req, res) {
  User.find()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function updateUser(req, res) {
  var epicGamesId = req.params.epicGamesId;
  var events = req.body.events;
  var sessions = req.body.sessions;
  var room = req.body.room;
  var newCanAccess = req.body.canAccess;
  var newisAuthorized = req.body.isAuthorized;

  User.findOneAndUpdate(
    { "epicGamesId": epicGamesId },
    { $set: { "events": events, "sessions": sessions, "room": room, "canAccess": newCanAccess, "isAuthorized": newisAuthorized } },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function updateUserRole(req, res) {
  var epicGamesId = req.params.epicGamesId;
  var newRole = req.body.role;

  User.findOneAndUpdate(
    { "epicGamesId": epicGamesId },
    { $set: { "role": newRole } },
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


