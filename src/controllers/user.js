import User from "../models/user.js";

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

// Check if a given tezWallet exists
export async function checkTezWalletExists(req, res) {
  try {
    const { tezWallet } = req.body;

    if (!tezWallet) {
      return res.status(400).json({ error: "TezWallet must be provided" });
    }

    const user = await User.findOne({ tezWallet });

    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

// Get user by Wallet Address
export function getUserByWallet(req, res) {
  const { tezWallet } = req.params;

  if (!tezWallet) {
    return res.status(400).json({ error: "Wallet must be provided" });
  }

  User.findOne({ tezWallet })
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
export async function updateArtifactsData(req, res) {
  try {
    const { tezWallet } = req.params;
    const { skipped, artefacts } = req.body.artifactsData;

    if (!tezWallet) {
      return res.status(400).json({ error: "TezWallet must be provided" });
    }

    if (skipped === undefined || !Array.isArray(artefacts)) {
      return res.status(400).json({ error: "Invalid artifactsData format" });
    }

    // Fetch the existing user document
    const user = await User.findOne({ tezWallet });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get existing artefact IDs from the user's document
    const existingArtefactIds = new Set(user.artifactsData.artefacts.map(a => a.artefactId.toString()));

    // Filter out artefacts that already exist
    const newArtefacts = artefacts.filter(a => !existingArtefactIds.has(a.artefactId.toString()));

    // Check if there are new artefacts to add
    if (newArtefacts.length === 0) {
      return res.status(200).json(user); // No new artefacts to add
    }

    // Update the user document
    const updatedUser = await User.findOneAndUpdate(
      { tezWallet },
      {
        $set: { 'artifactsData.skipped': skipped },
        $push: { 'artifactsData.artefacts': { $each: newArtefacts } }
      },
      { new: true, runValidators: true }
    );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Add a minigame to the MiniGames array and update the skipped field
export async function updateMinigamesData(req, res) {
  try {
    const { tezWallet } = req.params;
    const { skipped, puzzles } = req.body.miniGames;

    if (!tezWallet) {
      return res.status(400).json({ error: "TezWallet must be provided" });
    }

    if (skipped === undefined || !Array.isArray(puzzles)) {
      return res.status(400).json({ error: "Invalid miniGames format" });
    }

    // Fetch the existing user document
    const user = await User.findOne({ tezWallet });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get existing minigame IDs from the user's document
    const existingPuzzlesIds = new Set(user.miniGames.puzzles.map(a => a.puzzleId.toString()));

    // Filter out minigames that already exist
    const newPuzzles = puzzles.filter(a => !existingPuzzlesIds.has(a.puzzleId.toString()));

    // Check if there are new minigames to add
    if (newPuzzles.length === 0) {
      return res.status(200).json(user); // No new minigames to add
    }

    // Update the user document
    const updatedUser = await User.findOneAndUpdate(
      { tezWallet },
      {
        $set: { 'miniGames.skipped': skipped },
        $push: { 'miniGames.puzzles': { $each: newPuzzles } }
      },
      { new: true, runValidators: true }
    );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}