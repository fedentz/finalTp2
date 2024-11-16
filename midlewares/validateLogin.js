import { verifyToken } from "../utils/token.js"

export const validateLogin = async (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) throw new Error("No pasas")
    const verify = verifyToken(token)
    req.user = verify.data
    next()
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    })
  }
}