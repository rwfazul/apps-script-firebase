// The only use of these functions is to modify the Spreadsheet's JSON structure before sent it to the database .
// Use or change these functions (if judged necessary) based on your desired changes in the spreadsheet base format.

function formatterRawData(rawData) {
  var formattedData = {};
  getBaseHeaderKeys().forEach(function(header, index) { 
    if (rawData[index])
      formattedData[header] = rawData[index];
  });
  formattedData['horarios'] = getSchedule(rawData);
  return formattedData;
}

function getSchedule(rawData) {
  var schedule = {};
  var offset = getBaseHeaderKeys().length;
  getWeekDaysKeys().forEach(function(day) {
    var availableHours = [];
    getTimesKeys().forEach(function(time, timeIndex) {
      if ( (new RegExp(day)).test(rawData[offset + timeIndex]) ) // search substring with regex
        availableHours.push(time);
    })
    if (availableHours.length)
      schedule[day] = availableHours;
  });
  return schedule;
}
