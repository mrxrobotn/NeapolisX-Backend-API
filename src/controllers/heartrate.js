import Heartrate from "../models/heartrate.js";

export function getHeartrateValue(req, res) {
    Heartrate.findOne()
    .then((doc) => {
        res.status(200).json(doc);
    })
    .catch((err) => {
        res.status(500).json({ error: err});
    });
}