import express from "express";
import validateToken from "../Middleware/authMiddleware.mjs";
import authorizeRoles from "../Middleware/roleMiddleware.mjs";

const router = express.Router();

router.get("/PanelAdmin", validateToken, authorizeRoles("owner"), (req, res) => {
  res.json({ message: "welcome Owner" });
});

router.get(
  "/Admin",
  validateToken,
  authorizeRoles("owner", "admin"),
  (req, res) => {
    res.json({ message: "welcome Editor" });
  }
);
router.get(
  "/Editor",
  validateToken,
  authorizeRoles("owner", "editor", "admin"),
  (req, res) => {
    res.json({ message: "welcome Editor" });
  }
);

router.get("/PanelUser", validateToken, authorizeRoles("user"), (req, res) => {
  res.json({ message: "welcome User" });
});

router.get("/", (req, res) => {
  res.json({ message: "welcome to website" });
});

export default router;
