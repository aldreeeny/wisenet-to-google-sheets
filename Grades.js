function refreshGrades() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Unit Enrolments")
  let sheetData = sheet.getDataRange().getValues()
  sheetData.shift()
  let data = []
  sheetData.forEach(function(row){
    if(data.length == 0) {
      data.push(row)
    } else {
      let find = data.find((as) => as[0] == row[0])
      if(find == undefined) {
        if(row[17] == "" && row[10] != "Enquiry"){
          row[18] = "Still Enrolled"
        }
        data.push(row)
      }
    }
  })
  let sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Unit Enrolments(Unique)")
  sheet2.getRange("A2:Y").clearContent()
  sheet2.getRange(2,1,data.length,data[0].length).setValues(data).setHorizontalAlignment("center")
  sheet2.getRange("A2:Y").sort({column: 1, ascending: false})
}