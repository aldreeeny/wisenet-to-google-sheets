function getData2() {
  var baseUrl = "https://api.wisenet.co/v1/course-enrolments";
  let datetime = new Date("01/01/2019").toISOString()
  var url = baseUrl + "?lastModifiedTimestampFilter=gt:2019-01-01T10:15:00.000";
  var apiKey = "YOUR_WISENET_API_KEY"; // <-- Replace with your actual API key
  
  var params = {
    headers : {
      "x-api-key" : apiKey
    }
  };
  var data = [];
  clearNewSheet()
  var response = UrlFetchApp.fetch(url, params);
  var parsed = JSON.parse(response.getContentText());
  addtoNewDataSheet(parsed)
  var bool = false;
  if(parsed.length == 1000) {
    bool = true;
  }
  
  var skip = 1;
  while(bool) {
    var newurl =baseUrl+"?skip="+(skip*1000)+"&take=1000";
    var res = UrlFetchApp.fetch(newurl, params);
    var parsedRes = JSON.parse(res.getContentText());
    if(parsedRes != null) {
      addtoNewDataSheet(parsedRes)
      if(parsedRes.length < 1000) {
        bool = false;
        break;
      }
      skip++;
    } else { break; }
  }
  refreshMasterlist()
  getRetentions()
  refreshRetentionsGraph()
  refreshPage1()
}

function addtoNewDataSheet(data) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("New Datasheet")
  let sheetData = sheet.getDataRange().getValues()
  let lastRow = sheetData.length
  let writeData = []
  data.forEach(function(row) {
    let dataa = row.Data
    let joins = row.Relationships
    let hold = []
    hold.push(dataa.CourseEnrolmentId)
    hold.push(dataa.StudentNumber)
    hold.push(joins.Learner.FirstName)
    hold.push(joins.Learner.LastName)
    hold.push(joins.Learner.LearnerNumber)
    hold.push(joins.Learner.Email)
    hold.push((joins.Learner.DateOfBirth!= null)? new Date(joins.Learner.DateOfBirth): "")
    hold.push((dataa.StartDate!= null)? new Date(dataa.StartDate): "")
    hold.push((dataa.EndDate!= null)? new Date(dataa.EndDate): "")
    hold.push((dataa.EnquiryDate!= null)? new Date(dataa.EnquiryDate): "")
    hold.push((dataa.EnrolmentDate!= null)? new Date(dataa.EnrolmentDate): "")
    hold.push((dataa.ReEnrolmentDate!= null)? new Date(dataa.ReEnrolmentDate): "")
    hold.push((joins.EnrolmentStatus!= null)? joins.EnrolmentStatus.Description: "")
    hold.push((joins.EnrolmentStatusReason!= null)? joins.EnrolmentStatusReason.Description: "")
    hold.push((joins.StudyMode!= null)? joins.StudyMode.Description: "")
    hold.push((dataa.EcafCensusDate!= null)? new Date(dataa.EcafCensusDate): "")
    hold.push(joins.CourseOffer.Code)
    hold.push(joins.CourseOffer.Description)
    hold.push((joins.CourseOffer.CourseOfferStartDate!= null)? new Date(joins.CourseOffer.CourseOfferStartDate): "")
    hold.push((joins.CourseOffer.CourseOfferEndDate!= null)? new Date(joins.CourseOffer.CourseOfferEndDate): "")
    hold.push(dataa.EstimatedYearlyEftsl)
    sheetData.push(hold)
  })

  
  sheet.getRange(1,1,sheetData.length,sheetData[0].length).setValues(sheetData).setHorizontalAlignment("center");
  sheet.getRange("A2:U").sort({column: 1, ascending: false})
}