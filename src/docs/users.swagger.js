/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: List all users (from MongoDB)
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a user (password is hashed from coder123)
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, example: test@mail.com }
 *               role: { type: string, example: user }
 *     responses:
 *       201:
 *         description: User created
 *       409:
 *         description: Email already exists
 *
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         email: { type: string }
 *         role: { type: string, enum: [user, admin] }
 *         pets:
 *           type: array
 *           items: { type: string }
 */
export {};
