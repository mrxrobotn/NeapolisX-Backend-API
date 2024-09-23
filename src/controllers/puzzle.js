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


export function getPuzzleIdByName(req, res) {
  const puzzleName = req.params.name;

  Puzzle.findOne({ name: puzzleName })
    .then((doc) => {
      if (doc) {
        res.status(200).json({ puzzleId: doc._id });
      } else {
        res.status(404).json({ error: "Puzzle not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}