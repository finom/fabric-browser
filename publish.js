const { execSync } = require("child_process");
const path = require("path");
const { writeFileSync, readFileSync } = require("fs");
const https = require("https");

function fetchLatestReleaseTag(repo, callback) {
  // Make a GET request to the GitHub API to fetch the latest release tag
  const options = {
    headers: {
      "User-Agent": "FabricRepository/1.0",
    },
  };
  https
    .get(
      "https://api.github.com/repos/" + repo + "/releases/latest",
      options,
      function (res) {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          const release = JSON.parse(data);
          const tag = release.tag_name;
          callback(tag);
        });
      }
    )
    .on("error", function (err) {
      console.error(`Error: ${err.message}`);
      callback(null);
    });
}

fetchLatestReleaseTag("fabricjs/fabric.js", function (latestTag) {
  if (!latestTag) {
    console.error("Error: unable to fetch latest release tag.");
    return;
  }

  execSync(
    "rm -rf fabric-repository && git clone --depth 1 --branch " +
      latestTag +
      " https://github.com/fabricjs/fabric.js.git fabric-repository"
  );
  const { name, description } = require("./package.json");
  const fabricPkg = require("./fabric-repository/package.json");
  const readmePath = path.resolve(__dirname, "fabric-repository/README.md");
  const fabricReadme = readFileSync(readmePath);

  writeFileSync(
    path.resolve(__dirname, "fabric-repository/package.json"),
    JSON.stringify(
      {
        ...fabricPkg,
        optionalDependencies: {},
        name,
        description,
      },
      null,
      "\t"
    )
  );

  writeFileSync(
    readmePath,
    name + "\n-----------\n\n" + description + "\n\n\n" + fabricReadme
  );

  execSync("cd fabric-repository && npm i --no-shrinkwrap && npm run build");
  execSync("npm publish fabric-repository");

  console.log("Success!");
});
