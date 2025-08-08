function UEGetData() {
  var baseUrl = "https://api.wisenet.co/v1/unit-enrolments";
  let datetime = new Date("01/01/2019").toISOString()
  var url = baseUrl + "?lastModifiedTimestampFilter=gt:2019-01-01T10:15:00.000";
  var apiKey = "YOUR_WISENET_API_KEY_HERE";
  
  var params = {
    headers : {
      "x-api-key" : apiKey
    }
  };
  var data = [];
 clearUESheet()
 var response = UrlFetchApp.fetch(url, params);
 var parsed = JSON.parse(response.getContentText());
 addtoUEDataSheet(parsed)
  var bool = true;
 if(parsed.length == 1000) {
   bool = true;
 }
  
  var skip = 1;
  while(bool) {
    var newurl =baseUrl+"?skip="+(skip*1000)+"&take=1000&lastModifiedTimestampFilter=gt:2019-01-01T10:15:00.000";
    var res = UrlFetchApp.fetch(newurl, params);
    var parsedRes = JSON.parse(res.getContentText());
    if(parsedRes != null) {
      addtoUEDataSheet(parsedRes)
      if(parsedRes.length < 1000) {
        bool = false;
        break;
      }
      skip++;
    } else { break; }
  }
}

function addtoUEDataSheet(data) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Unit Enrolments(Raw)")
  let sheetData = sheet.getDataRange().getValues()
  let lastRow = sheetData.length
  let writeData = []
  data.forEach(function(row) {
    let dataa = row.Data
    let joins = row.Relationships
    let hold = []
    hold.push(joins.CourseEnrolment.CourseEnrolmentId)
    hold.push(joins.Learner.FirstName)
    hold.push(joins.Learner.LastName)
    hold.push(joins.Learner.LearnerNumber)
    hold.push(joins.Learner.Email)
    hold.push((joins.Learner.DateOfBirth!= null)? new Date(joins.Learner.DateOfBirth): "")
    hold.push((joins.CourseEnrolment.StartDate!= null)? new Date(joins.CourseEnrolment.StartDate): "")
    hold.push((joins.CourseEnrolment.EndDate!= null)? new Date(joins.CourseEnrolment.EndDate): "")
    hold.push("")
    hold.push("")
    hold.push((joins.CourseEnrolment!= null)? joins.CourseEnrolment.EnrolmentStatusDescription: "")
    hold.push((joins.EnrolmentStatusReason!= null)? joins.EnrolmentStatusReason.Description: "")

    hold.push((dataa.CensusDate!= null)? new Date(dataa.CensusDate): "")
    hold.push(joins.CourseOffer.Code)
    hold.push(joins.CourseOffer.Description)
    hold.push((joins.CourseOffer.CourseOfferStartDate!= null)? new Date(joins.CourseOffer.CourseOfferStartDate): "")
    hold.push((joins.CourseOffer.CourseOfferEndDate!= null)? new Date(joins.CourseOffer.CourseOfferEndDate): "")
    hold.push((joins.Outcome!= null)? joins.Outcome.Code: "")
    hold.push((joins.Outcome!= null)? joins.Outcome.Description: "")
    hold.push((dataa.StartDate !=null)? new Date(dataa.StartDate): "")
    hold.push((dataa.EndDate != null)? new Date(dataa.EndDate): "")
    hold.push((joins.UnitOffer.StartDate!= null)? new Date(joins.UnitOffer.StartDate): "")
    hold.push((joins.UnitOffer.EndDate!= null)? new Date(joins.UnitOffer.EndDate): "")
    hold.push((joins.CourseOffer.StartDate!= null)? new Date(joins.CourseOffer.StartDate): "")
    hold.push((joins.CourseOffer.EndDate!= null)? new Date(joins.CourseOffer.EndDate): "")
    sheetData.push(hold)
  })

  sheet.getRange(1,1,sheetData.length,sheetData[0].length).setValues(sheetData).setHorizontalAlignment("center");
  sheet.getRange("A2:Y").sort({column: 1, ascending: false})
}

function getUnitsAfter2019() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Unit Enrolments(Raw)")
  let sheetData = sheet.getDataRange().getValues()
  let sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Unit Enrolments")
  let data = []
  sheetData.forEach(function(row) {
    // @ts-ignore
    let datehold = new Date(row[21])
    if(datehold.getFullYear() >= 2019) {
      data.push(row)
    }
  })
  
  sheet2.getRange("A2:Y").clearContent();
  sheet2.getRange(2,1,data.length,data[0].length).setValues(data).setHorizontalAlignment("center");
  sheet2.getRange("A2:Y").sort({column: 1, ascending: false})
}