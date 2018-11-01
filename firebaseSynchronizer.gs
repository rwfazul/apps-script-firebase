// This function takes in a path to a Firebase doc. (database reference), and returns the URL of database Rest API that can update the data in that path
function getFirebaseUrl(firebaseRef) {
  return (
    PropertiesService.getScriptProperties().getProperty('firebaseDatabaseUrl') +
    firebaseRef +
    '.json?auth=' +
    PropertiesService.getScriptProperties().getProperty('firebaseSecret')
  );
}

function pushDataFirebase(key, data) {
  /*
    Make a PUT (update) request and send a JSON payload
    More info on the REST API here : https://firebase.google.com/docs/database/rest/start
  */
  var options = {
    method: 'PUT',
    contentType: 'application/json',
    payload: JSON.stringify(data)
  };
  
  // Get Firebase URL using the changed row number as nested key of 'solicitacoes' document
  var firebaseUrl = getFirebaseUrl('solicitacoes/' + key);

  /*
    Use UrlFetchApp Google scripts module
    More info of UrlFecthApp here : https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app
  */
  UrlFetchApp.fetch(firebaseUrl, options);
}
