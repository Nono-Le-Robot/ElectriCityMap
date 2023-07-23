const e = require("express");
const userModel = require("../models/auth.model.js");
const pointsModel = require("../models/points.model.js");

module.exports.getMyData = async (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .select("-password")
    .then((user) => {
      if (!user) {
        return res.json({ msg: "User not found", status: false });
      } else {
        res.send(user);
      }
    })
    .catch((error) => res.status(401).send(error.message));
};

module.exports.updateData = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (req.body.round > user.maxRound) {
      user.maxRound = req.body.round;
    }

    await user.save();

    res.json({
      message: "Données utilisateur mises à jour avec succès",
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour des données utilisateur",
      error: error,
    });
  }
};

module.exports.getAllPoints = async (req, res) => {
  pointsModel.find().exec(function (err, points) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(points);
    }
  });
};

module.exports.deletePoint = async (req, res) => {
  pointsModel.deleteOne({ _id: req.body.pointId }).exec(function (err, point) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      console.clear();
      console.log(point);
      res.status(200).send(point);
    }
  });
};

module.exports.addPoint = async (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .select("-password")
    .then(async (user) => {
      if (!user) {
        return res.json({ msg: "User not found", status: false });
      } else {
        const {
          email,
          idUser,
          pointName,
          pointDescription,
          coords,
          addedBy,
          spotState,
          needValidate,
        } = req.body;
        const checkUser = await userModel.findOne({ email });

        if (!checkUser) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
        } else {
          const newPoint = new pointsModel({
            email,
            idUser,
            pointName,
            pointDescription,
            coords,
            addedBy,
            spotState,
            needValidate,
          });
          await newPoint.save();
          res.json({
            message: "Point ajouté avec succès",
            point: {
              pointName: newPoint.pointName,
              pointDescription: newPoint.pointDescription,
              coords: newPoint.coords,
              addedBy: newPoint.addBy,
              spotState: newPoint.spotState,
              needValidate: newPoint.needValidate,
            },
          });
        }
      }
    })
    .catch((error) => res.status(401).send(error.message));
};
