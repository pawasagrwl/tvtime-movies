const fs = require('fs');
const readline = require('readline');

const inputFilePath = 'data.txt';
const outputFilePath = 'data.json';

async function processFile() {
  const fileStream = fs.createReadStream(inputFilePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let combinedObjects = [];

  for await (const line of rl) {
    if (line.trim()) {
      try {
        const jsonObject = JSON.parse(line);
        if (jsonObject.data && jsonObject.data.objects) {
          combinedObjects = [...combinedObjects, ...jsonObject.data.objects];
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }

  // Remove duplicates based on UUID
  const uniqueObjects = [];
  const seenUuids = new Set();

  for (const obj of combinedObjects) {
    if (!seenUuids.has(obj.uuid)) {
      uniqueObjects.push(obj);
      seenUuids.add(obj.uuid);
    }
  }

  const finalData = {
    data: {
      objects: uniqueObjects
    }
  };

  // Write the new data to a temporary file first
  const tempFilePath = 'temp_data.json';
  fs.writeFileSync(tempFilePath, JSON.stringify(finalData, null, 2));

  // If successful, delete the old data.json file and rename the temporary file
  if (fs.existsSync(tempFilePath)) {
    if (fs.existsSync(outputFilePath)) {
      fs.unlinkSync(outputFilePath);
    }
    fs.renameSync(tempFilePath, outputFilePath);
    console.log('data.json file created successfully.');
  } else {
    console.error('Failed to create the temporary data file.');
  }
}

processFile().catch(console.error);
