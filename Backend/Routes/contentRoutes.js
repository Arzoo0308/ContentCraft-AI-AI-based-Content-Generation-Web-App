const express = require("express");
const router = express.Router();

const { generateCaption } = require("../Controller/captionController");
const { generateHashtags } = require("../Controller/hashtagController");
const { generateScript } = require("../Controller/scriptController");

router.post("/caption", generateCaption);
router.post("/hashtags", generateHashtags);
router.post("/script", generateScript);

module.exports = router;