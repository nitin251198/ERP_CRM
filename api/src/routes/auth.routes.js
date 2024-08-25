const express = require("express");
const {
    create,
    login,
    logout
} = require("../controllers/auth.controller");

const { hasAuthentication } = require('../middleware/hasAuth')

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth Management
 */

/**
 * @swagger
 * /auth/signup:
 *  post:
 *    tags: [Auth]
 *    summary: create a user account
 *    description: Use to create a user account
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: Create User successfully.
 */
router.post('/signup', create);

/**
 * @swagger
 * /auth/signin:
 *  post:
 *    tags: [Auth]
 *    description: Use to login to account
*    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: Login successfully.
 */
router.post('/signin', login);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Auth]
 *     description: Logout user 
 *     responses:
 *       200:
 *         description: Logout Sucessfully
 */
router.get('/logout', hasAuthentication(), logout);


module.exports = router;
