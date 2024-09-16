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

export function getArtefacts(req, res) {
  Artefact.find()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getArtefactIdByName(req, res) {
  const artefactName = req.params.name;

  Artefact.findOne({ name: artefactName })
    .then((doc) => {
      if (doc) {
        res.status(200).json({ artefactId: doc._id });
      } else {
        res.status(404).json({ error: "Artefact not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}