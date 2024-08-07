import Artefact from "../models/artefact.js";

export function getArtefactById(req, res) {
    Artefact.findById(req.params._id)
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
  