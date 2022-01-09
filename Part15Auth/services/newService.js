import { executeQuery } from "../database/database.js";

const addAccount = async (name, userId) => {
  await executeQuery(
    "INSERT INTO accounts (name, user_id) VALUES ($1, $2)",
    name,
    userId,
  );
};

const findAccountsForUser = async (userId) => {
  return await executeQuery(
    "SELECT * FROM accounts WHERE user_id = $1",
    userId,
  );
};

export { addAccount, findAccountsForUser };
