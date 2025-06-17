const fs = require('fs');
const path = require('path');

const SOURCE_PATH = "./data/aviation/airports";
const DESTINATION_PATH = "./db-init/populate_airports.sql";

const jsonArray = readFiles(SOURCE_PATH);
writeSql(jsonArray);

// input: path - string of file path
// output: json - javascript object with json format
function readFileIntoJson(path) {
    if (fs.existsSync(path)) {
        const fileString = fs.readFileSync(path, { encoding: "utf8" });
        const json = JSON.parse(fileString);
        return json;
    }
    else {
        throw Error(`ERROR: File not found. Check if the input path exists`);
    }
}

function readFiles(dir) {
    const jsonArray = [];

    try {
        // Read directory synchronously - returns array of filenames
        const fileNames = fs.readdirSync(dir);

        fileNames.forEach(filename => {
            // get current file name and extension
            const name = path.parse(filename).name;
            const ext = path.parse(filename).ext;
            // get current file path
            const filepath = path.resolve(dir, filename);

            try {
                // Get file stats synchronously
                const stat = fs.statSync(filepath);

                // Check if it's a file and has .json extension
                if (stat.isFile() && ext === ".json") {
                    const json = readFileIntoJson(filepath);
                    jsonArray.push(json);
                }
            } catch (statError) {
                console.error(`Error processing file ${filename}:`, statError);
            }
        });
    } catch (error) {
        console.error("Error reading directory:", error);
    }

    return jsonArray;
}

function writeSql(jsonArray) {
    var result = 
        `INSERT INTO Airports (
        id, gmt, airport_id, iata_code, city_iata_code, icao_code, country_iso2, geoname_id, 
        latitude, longitude, airport_name, country_name, phone_number, timezone
        ) VALUES\n`
    const countries = jsonArray.map(element => element.data).flat();
    countries.forEach(e => {
        // TODO: null value is not correctly handled for the sake of quick prototyping. 
        const line = `('${e.id}', '${e.gmt}', '${e.airport_id}', '${e.iata_code}', '${e.city_iata_code}', '${e.icao_code}', '${e.country_iso2}', '${e.geoname_id}',`
                    + `'${e.latitude}', '${e.longitude}', '${escapeSingleQuote(e.airport_name)}', '${escapeSingleQuote(e.country_name)}', '${e.phone_number}', '${e.timezone}'),\n`;
        result += line;
    })
    // replace last line's "," by ";"
    result = result.slice(0, -2) + ';\n';
    try {
        fs.writeFileSync(DESTINATION_PATH, result);
      } catch (err) {
        console.error(err);
      }
}

// postgres cannot handle single quote in a string. For escaping, double single quote is used.
// this function converts a single quote to double single quotes. 
function escapeSingleQuote(str) {
    if (typeof str === 'string') return str.replace("'", "''");
    else if (str === null) return "null";
    else return "N/A";
}