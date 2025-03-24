module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert("Users", [
        {
          name: "Admin",
          phone: "0796897579",
          location: "Jordan",
          password: "12345678", 
          image: null,
          role: "admin",
          adminApproved: "approved", 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete("Users", { role: "admin" });
    },
  };
  