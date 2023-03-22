const express = require("express");
require("express-group-routes");
const router = express.Router();

const tryCatch = require("../utils/tryCatch");
const { userController } = require("../controllers");
const hasKey = require("../middlewares/hasKey");

router.group("/v1", router => {
  /**
   * @swagger
   * /api/user/v1/users:
   *   get:
   *     summary: Get a list of users
   *     description: Returns a list of all users
   *     tags:
   *       - Users
   *     security:
   *       - apiKeyAuth: []
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/USEROUTPUT'
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal Server Error
   */
  router.get("/users", [hasKey], tryCatch(userController.getAllUsers));
  /**
   * @swagger
   * /api/user/v1/sign-up:
   *   post:
   *     summary: Create a user
   *     description: Returns a created user
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/USERINPUT'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/USERINPUT'
   *       500:
   *         description: Internal Server Error
   */
  router.post("/sign-up", tryCatch(userController.signup));

  /**
   * @swagger
   * /api/user/v1/delete-user/{id}:
   *   delete:
   *     summary: Delete a user by ID
   *     description: Deletes a user by their unique identifier
   *     tags:
   *       - Users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The unique identifier of the user to delete
   *         schema:
   *           type: string
   *     security:
   *       - apiKeyAuth: []
   *     responses:
   *       204:
   *         description: User deleted successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
  router.delete("/delete-user/:id", [hasKey], tryCatch(userController.deleteUser));

  /**
   * @swagger
   * /api/user/v1/log-in:
   *   post:
   *     summary: Login user
   *     description: Login to ui by providing email and password
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *             required:
   *               - email
   *               - password
   *     responses:
   *       204:
   *         description: User logged in successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
  router.post("/log-in", tryCatch(userController.login));
});

module.exports = router;
