// This function takes in a path to a Firebase key, and returns the URL of database Rest API that can update the data in that path
function getFirestoreUrl(collection) {
  return (
    PropertiesService.getScriptProperties().getProperty('firestoreDatabaseUrl') + 
    collection
  );
}

/* Wrap elements into JSON objects are necessary to send data to Firestore REST API,
   More info on: https://cloud.google.com/firestore/docs/reference/rest/v1beta1/Value
   This methods are based on those of GRAHAM PATRICK EARLEY blog: http://grahamearley.website/blog/2017/10/18/firestore-in-google-apps-script.html */
function wrapString(string) {
  return {"stringValue" : string};
}

function wrapDouble(double) {
  return {"doubleValue" : double};
}

function wrapInt(int) {
  return {"integerValue" : int};
}

function wrapNumber(num) {
  if (num % 1) return wrapDouble(num);
  return wrapInt(num);
}

function wrapBoolean(boolean) {
  return {"booleanValue" : boolean};
}

function wrapObject(object) {
  if (!object) 
    return {"nullValue" : null};
  if (object.constructor.name === 'Date') // Timestamp or similar
    return {"mapValue" : createFirestoreObject(wrapString(JSON.stringify(object)))}
  return {"mapValue" : createFirestoreObject(object)};
}

function createFirestoreObject(object) {
  const firestoreObj = {}    
  firestoreObj["fields"] = {}
  
  const keys = Object.keys(object);  

  keys.forEach(function(key) {
    var val = object[key]
    var type = typeof(val)
    switch(type) {
      case "string":
        firestoreObj["fields"][key] = wrapString(val)
        break;
      case "number":
        firestoreObj["fields"][key] = wrapNumber(val)
        break;
      case "boolean":
        firestoreObj["fields"][key] = wrapBoolean(val)
        break;
      case "object":
        firestoreObj["fields"][key] = wrapObject(val)
        break;
      default:
        Logger.log('Unsupported data type:' + type)
    }  
  });
  return firestoreObj;
}
/* */

function pushDataFirestore(key, data) {
  /*
    Make a POST (update) request and send a JSON payload
    More info on the REST API here : https://firebase.google.com/docs/firestore/use-rest-api
  */
  var options = {
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify( createFirestoreObject(data) ) // Firestore REST API requires specific data structure 
  };
  
  // Get Firebase URL using the changed row number as nested key of 'solicitacoes' document
  var firestoreUrl = getFirestoreUrl('solicitacoes');

  /*
    Use UrlFetchApp Google scripts module
    More info of UrlFecthApp here : https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app
  */
  UrlFetchApp.fetch(firestoreUrl, options);
}
