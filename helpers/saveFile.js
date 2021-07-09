const fs = require("fs");

const file = "./db/database.json"; 
const saveDB = (data) => {
  fs.writeFileSync(file, JSON.stringify({"historial":data}));
};

const readDB = () => {
  if (!fs.existsSync(file)) {
    return null;
  }
  const data = fs.readFileSync(file,{encoding:'utf-8'});

  const response= JSON.parse(data); 
  return response["historial"];
};

module.exports = { 
    saveDB,
    readDB
 };
