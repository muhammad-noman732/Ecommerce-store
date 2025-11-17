import multer from "multer"

// Use /tmp because Docker + Coolify allow writing here
// This is simpler and more reliable than managing custom directories
export const upload = multer({
  dest: "/tmp"
})