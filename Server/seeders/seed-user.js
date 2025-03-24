module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert("Users", [
        {
          name: "mahmoud",
          phone: "0700000000",
          location: "Jordan",
          password: "Mm123123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "influencer1",
          phone: "0711111111",
          location: "Jordan",
          password: "Inf123456",
          role: "influencer", // هذا سيتم تحديده لأن الإنفلونسر ليس "user"
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "influencer2",
          phone: "0722222222",
          location: "Jordan",
          password: "Inf654321",
          role: "influencer",
          adminApproved: "approved", // هذا سيتم تحديده لأن المشرف وافق عليه
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "influencer3",
          phone: "0733333333",
          location: "Jordan",
          password: "Inf789123",
          role: "influencer",
          adminApproved: "rejected", // هذا سيتم تحديده لأن المشرف رفضه
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete("Users", { 
        phone: ["0700000000", "0711111111", "0722222222", "0733333333"] 
      });
    },
  };
  