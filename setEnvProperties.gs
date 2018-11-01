/*
  // Firebase Realtime Database 
  var firebaseSecret = '<database-secret>';
  var firebaseDatabaseUrl = '<fireabase-realtime-url>';
*/
function setPropsFirebase() {
  PropertiesService.getScriptProperties().setProperty('firebaseSecret', '<database-secret>'); 
  PropertiesService.getScriptProperties().setProperty('firebaseDatabaseUrl', '<fireabase-realtime-url>'); 
}

/*
  // Cloud Firestore
  var _firestoreBaseUri = '<firestore-base-uri>';
  var _firestoreProjectId = '<project-id>';
  var firestoreDatabaseUrl =  _firestoreBaseUri + '/v1beta1/projects/' + _firestoreProjectId + '/databases/(default)/documents/';
*/
function setPropsFirestore() {
  var _firestoreBaseUri = '<firestore-base-uri>';
  var _firestoreProjectId = '<project-id>;
  var firestoreDatabaseUrl =  _firestoreBaseUri + '/v1beta1/projects/' + _firestoreProjectId + '/databases/(default)/documents/';
  PropertiesService.getScriptProperties().setProperty('firestoreDatabaseUrl', firestoreDatabaseUrl);  
}
