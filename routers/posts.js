const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const {destroy } = require("../middlewares/middlewareDestroy")

const multer = require("multer");
const uploader = multer({dest: "public"})

router.get("/", postsController.index);

router.post("/", uploader.single("immagine") ,postsController.store);

router.get("/create", postsController.create)

router.get("/:slug", postsController.show)

router.delete("/:slug", destroy, postsController.destroy)

router.get("/:slug/download", postsController.download)

module.exports = router;