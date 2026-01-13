import { User } from "../model/user.model.js"
import { sanitizeUser } from "../utils/userUtils.js"


export const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findById(req.userId)
      .select("-password")

    if (!user) {
      return res.status(404).json({ message: "User is not found." })
    }

    return res.status(200).json(sanitizeUser(user))


  } catch (error) {

    return res.status(500).json({ message: `Get User error  ${error}` })


  }
}

export const getAdmin = async (req, res) => {
  try {

    if (req.role !== 'ADMIN') {
      return res.status(403).json({ message: "Forbidden. Admins only." })
    }

    const admin = await User.findById(req.userId).select('email role')
    if (!admin) {
      return res.status(404).json({ message: "User is not found." })
    }

    return res.status(201).json({
      email: admin.email,
      role: admin.role
    })


  } catch (error) {
    return res.status(500).json({ message: `Get  Admin   error  ${error}` })
  }
}

export const getAllUsers = async (req, res) => {
  try {

    if (req.role !== 'ADMIN') {
      return res.status(403).json({ message: "Forbidden. Admins only." })
    }

    const { page = 1, limit = 20 } = req.query
    const pageNum = Math.max(1, parseInt(page))
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)))
    const skip = (pageNum - 1) * limitNum

    const [users, total] = await Promise.all([
      User.find({ role: { $ne: 'ADMIN' } }).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      User.countDocuments({ role: { $ne: 'ADMIN' } })
    ])

    return res.status(200).json({
      data: users,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum)
    })


  } catch (error) {
    return res.status(500).json({ message: `Get All Users error  ${error}` })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, role, phone } = req.body

    // Basic validation
    if (!name || !role) {
      return res.status(400).json({ message: "Name and role are required." })
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, role, phone },
      { new: true, runValidators: true }
    ).select("-password")

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." })
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: sanitizeUser(updatedUser)
    })

  } catch (error) {
    return res.status(500).json({ message: `Update User error: ${error.message}` })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    // Prevent self-deletion
    if (req.userId === id) {
      return res.status(400).json({ message: "You cannot delete your own admin account." })
    }

    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." })
    }

    return res.status(200).json({ message: "User deleted successfully" })

  } catch (error) {
    return res.status(500).json({ message: `Delete User error: ${error.message}` })
  }
}
