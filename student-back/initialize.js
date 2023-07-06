const Admin = require("./models/Admins");
const bcrypt = require("bcrypt");

const createAdmin = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin", salt);
    const admin = new Admin({
      username: "admin",
      password: hashedPassword,
    });
    await admin.save();
  } catch (error) {
    console.log(error);
  }
};

createAdmin();
