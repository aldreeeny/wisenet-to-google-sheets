function getData() {
  var baseUrl = "https://api.wisenet.co/v1/";
  var url = baseUrl + "course-enrolments";
  var apiKey = "YOUR_WISENET_API_KEY"; // <-- Replace with your actual API key
  
  var params = {
    headers : {
      "x-api-key" : apiKey
    }
  };
  var data = [];
  var response = UrlFetchApp.fetch(url, params);
  var parsed = JSON.parse(response.getContentText());
  var filter = parsed.filter(function(row) {
    return row.Relationships.EnrolmentStatus.Description == "Current";
  });
  if(filter.length > 0) {
    filter.forEach(function(row) {
      data.push(row);
    });
  }
  var bool = false;
  if(parsed.length == 1000) {
    bool = true;
  }
  
  var skip = 1;
  while(bool) {
    var newurl =url+"?skip="+(skip*1000)+"&take=1000";
    var res = UrlFetchApp.fetch(newurl, params);
    var parsedRes = JSON.parse(res.getContentText());
    if(parsedRes != null) {
      var filtered = parsedRes.forEach(function(row) {
        data.push(row);
      });
      if(parsedRes.length < 1000) {
        bool = false;
        break;
      }
      skip++;
    } else { break; }
  }
  return data;
}

function writeData() {
  var response = getData();
  var dataWrite = [];
  response.forEach(function(info){
    var data = info.Data;
    var joins = info.Relationships;
    var row = [];
    // course enrolment id
    row.push(data.CourseEnrolmentId);
    
    // name
    row.push(joins.Learner.FirstName+" "+joins.Learner.LastName);
    
    // learner number
    row.push(joins.Learner.LearnerNumber);
    
    // learner email
    row.push(joins.Learner.Email);
    
    // course offer description
    row.push(joins.CourseOffer.Description);
    
    // course offer code
    row.push(joins.CourseOffer.Code);
    
    // start date
    if(data.StartDate!=null) {
      var hold = data.StartDate;
      if(hold.length == 22) { hold += "0";}
      if(hold.length == 21) { hold += "00";}
      var date = new Date(hold);
      row.push(Utilities.formatDate(date, "GMT+0800", "YYYYMMdd"));
    } else { row.push(""); }
    
    // end date
    var hold = data.EndDate;
    if(data.EndDate!=null) {
      var hold = data.EndDate;
      if(hold.length == 22) { hold += "0";}
      if(hold.length == 21) { hold += "00";}
      var date = new Date(hold);
      row.push(Utilities.formatDate(date, "GMT+0800", "YYYYMMdd"));
    } else { row.push(""); }
    
    // enrolment status
    row.push((joins.EnrolmentStatus!= null)? joins.EnrolmentStatus.Description: "");
    
    // enrolment status reason
    var hold = "";
    if(joins.EnrolmentStatusReason != undefined) {
      hold = joins.EnrolmentStatusReason.Description;
    }
    row.push(hold);
    
    // study mode
    var hold = "";
    if(joins.StudyMode != undefined) {
      hold = joins.StudyMode.Description;
    }
    row.push(hold);
    
    
    dataWrite.push(row);
  });
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Course Enrollments");
  sheet.getRange("A2:K").clearContent();
  sheet.getRange(2,1,dataWrite.length,dataWrite[0].length).setValues(dataWrite).setHorizontalAlignment("center");
}