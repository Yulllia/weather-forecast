const User = require("../models/User");

const userService = {
    getUserById: async (googleId) => {
      try {
        const user = await User.findOne({ googleId: googleId });
        return user;
      } catch (error) {
        console.error('Error retrieving user:', error);
        throw error;
      }
    },
  };

module.exports = userService;