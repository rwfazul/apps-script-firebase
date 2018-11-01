// This function update the selected range in the Database (Firebase Realtime or Cloud Firestore)
function startSync(range) {
  // Get the currently active sheet
  var sheet = SpreadsheetApp.getActiveSheet();
  // Get the changed row and its columns
  var [row, columns] = [range.getRow(), sheet.getLastColumn()];
  // Get the data contained in the cells of this row
  var rawData = sheet.getRange(row, 1, 1, columns).getValues()[0];
  
  // Store this data
  // setPropsFirebase();  // just need to set properties one single time
  // setPropsFirestore(); // just need to set properties one single time      
  
  pushDataFirebase(row, formatterRawData(rawData));
  // pushDataFirestore(row, formatterRawData(rawData));
}

// Trigger when some cell on spreadsheet was changed
function onEdit(e){
  Logger.log('starting sync...');
  startSync(e.range);
  Logger.log('Line ' + e.range.getRow() + ', last modified: ' + new Date());
}
