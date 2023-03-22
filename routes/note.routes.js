const express = require("express");
require("express-group-routes");
const router = express.Router();

const tryCatch = require("../utils/tryCatch");
const { noteController } = require("../controllers");
const isAdmin = require("../middlewares/isAdmin");

router.group("/v1", router => {
  router.post("/note", [isAdmin], tryCatch(noteController.create));
  router.put("/share/:id", [isAdmin], tryCatch(noteController.shareNote));
});

module.exports = router;
