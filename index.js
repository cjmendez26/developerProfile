const inq = require("inquirer");
const htmlpdf = require("html-pdf");
const api = require("./api");
const html = require("./hw9");

/**
 * Async function to initialize the program
 */
const main = async () => {
  let config = {};
  try {
    /** Attempt to parse the config from the file .config.josn */
    const configRaw = await html.util.readFile(".config.json", "UTF-8");
    config = JSON.parse(configRaw);
  } catch (e) {
    let { username, color } = await inq.prompt([
      {
        name: "username",
        message: "GitHub username",
        type: "input"
      },
      {
        name: "color",
        message: "Please choose a color",
        type: "list",
        choices: Object.keys(html.colors)
      }
    ]);
    config.username = username;
    config.color = color;
  }

  const color = html.colors[config.color];

  // initialize the GitHub API
  if (typeof config.username) api.init(config.username);
  else api.init(process.env.GITHUB_TOKEN);

  // Get the GH user, profile, and repos
  const user = await api.getUser(config.username);
  const { data: profile } = await user.getProfile();
  const { data: repos } = await user.listRepos();

  // Calculate the number of stars
  const numStars = repos.reduce((acc, cur) => (acc += cur.stargazers_count), 0);

  // Fill the HTML 
  console.log("Filling html...");
  const filled = await html.fill({
    username: config.username,
    profileUrl: profile.html_url,
    imageUrl: profile.avatar_url,
    bio: profile.bio,
    numRepos: repos.length,
    numFollowers: (await user.listFollowers()).data.length,
    numFollowing: (await user.listFollowing()).data.length,
    numStars,
    color
  });
  console.log("html complete");

  // Generate PDF from generated HTML String
  htmlpdf
    .create(filled, { format: "letter" })
    .toFile(`./${config.username}.pdf`, (err, res) => {
      if (err) {
        console.log(err);
        process.exit(1);
      } else {
        console.log("PDF created");
      }
    });
};

main();