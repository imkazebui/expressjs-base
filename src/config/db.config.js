export default {
  development: {
    database: "d66rk5at421pfo",
    username: "psqkafmyhqbswv",
    password:
      "b0e8c036c8fd4ce297309d5f7d9e9f8085d53b37c8b1041c78057f82d9b02bc4",
    options: {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      host: "ec2-54-243-92-68.compute-1.amazonaws.com",
      port: "5432",
    },
  },
};
