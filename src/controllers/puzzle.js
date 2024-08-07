import Puzzle from "../models/puzzle.js";

export function getPuzzleById(req, res) {
    Puzzle.findById(req.params._id)
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
  