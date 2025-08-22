const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const app = require("./app");

dotenv.config();

const PORT = process.env.PORT || 8080;
const prisma = new PrismaClient();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
});