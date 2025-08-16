const fs = require('fs');
const path = require('path');

const SOURCE_PATH = "./data/aviation/countries";
const DESTINATION_PATH = "./db-init/populate_countries.sql";

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
        `INSERT INTO Countries (
        id, capital, currency_code, fips_code, country_iso2, country_iso3, continent,
        country_id, country_name, currency_name, country_iso_numeric, phone_prefix, population
        ) VALUES\n`
    const countries = jsonArray.map(element => element.data).flat();
    countries.forEach(c => {
        // TODO: null value is not correctly handled for the sake of quick prototyping. 
        const line = `('${c.id}', '${escapeSingleQuote(c.capital)}', '${c.currency_code}', '${c.fips_code}', '${c.country_iso2}', '${c.country_iso3}', '${c.continent}', '${c.country_id}', '${escapeSingleQuote(c.country_name)}', '${escapeSingleQuote(c.currency_name)}', '${c.country_iso_numeric}', '${c.phone_prefix}', ${c.population}),\n`;
        result += line;
    })
    // At the end of last line there is unnecessary ",". Replace it by ";".
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