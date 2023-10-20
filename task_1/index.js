import {encoded, translations} from './data.js'

//console.log("Let's rock")
//console.log(encoded, translations)

function decodeFields(encoded, translations) {
    const decoded = [];
    const uniqueIds = new Set();
  
    for (const item of encoded) {
      const decodedItem = {};
  
      for (const key in item) {
        if (key.endsWith("Id") && !["groupId", "service", "formatSize", "ca"].includes(key)) {
          const translatedValue = translations[item[key]];
          decodedItem[key] = translatedValue || item[key];
          if (translatedValue) {
            uniqueIds.add(item[key]);
          }
        } else {
          decodedItem[key] = item[key];
        }
      }
  
      decoded.push(decodedItem);
    }
  
    return { decoded, uniqueIds: Array.from(uniqueIds) };
  }
  
  
  const { decoded, uniqueIds } = decodeFields(encoded, translations);
  
  console.log("Decoded:");
  console.log(decoded);
  
  console.log("Unique IDs:");
  console.log(uniqueIds); 
