const { getDate, getColor, getTomorrow } = require("./app.js");
const fs = require("fs");

// STEP 1: Reading JSON file
let tempo;
try {
  const data = fs.readFileSync("info.json", "utf8");
  tempo = data ? JSON.parse(data) : [];
} catch (err) {
  if (err.code === "ENOENT") {
    // File does not exist, initialize with an empty array
    tempo = [];
  } else {
    throw err;
  }
}

async function define() {
  let datatoday = {
    date: getDate("today"),
    color: await getColor(),
  };
  let datatomorrow = {
    date: getDate("tomorrow"),
    color: await getTomorrow(),
  };
  return [datatoday, datatomorrow];
}

// Convert tempo to an array if it's not already
tempo = Array.isArray(tempo) ? tempo : [];

async function main() {
  // STEP 2: Adding new data to tempo object
  const [datatoday, datatomorrow] = await define();
  tempo.push(datatoday);
  tempo.push(datatomorrow);

  // STEP 3: Writing to a file
  fs.writeFile("info.json", JSON.stringify(tempo, null, 2), (err) => {
    // Checking for errors
    if (err) throw err;

    // Success
    console.log("Done writing");
  });

  const date = getDate("tomorrow");
  console.log(date);
}

function getHistory() {
  return new Promise((resolve, reject) => {
    fs.readFile("info.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

module.exports = { getHistory };
module.exports = { main };
