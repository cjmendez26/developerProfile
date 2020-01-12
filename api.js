const ghApi = require("github-api");

let api;


  @param {string} token_xor_username 
 
const init = (token_xor_username, password) => {
  api = new ghApi(
    typeof password === "string"
      ? { username: token_xor_username, password }
      : { token: token_xor_username }
  );
};


  @param {string} username 
 
const getUser = async username => {
  try {
    return dao.getUser(username);
  } catch (e) {
    console.log("user not found");
    process.exit(1);
  }
};

module.exports = { init, getUser };