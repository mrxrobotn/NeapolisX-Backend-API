import User from "../models/user.js";
import Artefact from "../models/artefact.js";


// Add a new user
export function addUser(req, res) {
  const { tezWallet, firstName, lastName, email } = req.body;

  if (!tezWallet || !firstName || !lastName || !email) {
    return res.status(400).json({ error: "All required fields must be provided" });
  }

  User.create(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Get user by ID
export function getUserById(req, res) {
  const { _id } = req.params;

  if (!_id) {
    return res.status(400).json({ error: "User ID must be provided" });
  }

  User.findById(_id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Update user information
export function updateUserInfo(req, res) {
  const { tezWallet } = req.params;
  const { firstName, lastName, email } = req.body;

  if (!tezWallet) {
    return res.status(400).json({ error: "TezWallet must be provided" });
  }

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: "All required fields must be provided" });
  }

  User.findOneAndUpdate(
    { tezWallet },
    { $set: { firstName, lastName, email } },
    { new: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Add an artifact to the artifactsData array and update the skipped field
export function addArtefactToUser(req, res) {
  const { tezWallet } = req.params;
  const { artefactId, timeSpent, skipped } = req.body;

  if (!tezWallet || !artefactId || typeof skipped !== 'boolean') {
    return res.status(400).json({ error: "TezWallet, artefactId, and skipped must be provided" });
  }

  // Check if the artefact exists
  Artefact.findById(artefactId)
    .then((artefact) => {
      if (!artefact) {
        return res.status(404).json({ error: "Artefact not found" });
      }

      // Find the user and update the artifactsData
      User.findOneAndUpdate(
        { tezWallet, 'artifactsData.skipped': false }, // Modify this query if needed to target specific data
        {
          $push: {
            'artifactsData.$.artefacts': {
              artefactId,
              timeSpent
            }
          },
          $set: {
            'artifactsData.$.skipped': skipped
          }
        },
        { new: true, arrayFilters: [{ "elem.skipped": false }], upsert: true }
      )
        .then((updatedUser) => {
          if (updatedUser) {
            res.status(200).json(updatedUser);
          } else {
            res.status(404).json({ error: "User not found or no matching artifactsData entry" });
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}