function writeEnquiries() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Course Enrollments Masterlist")
  let sheetData = sheet.getDataRange().getValues()
  sheetData.shift()
  let writeData = []
  sheetData.forEach(function(row) {
    if(row[9] != "" && row[23] != "") {
      let hold = []
      hold.push(row[0])
      hold.push(row[2])
      hold.push(row[3])
      hold.push(row[16])
      hold.push(row[17])
      hold.push(row[15])
      hold.push(getDaysDiff(row[9], row[23]))
      writeData.push(hold)
    }
  })
  
  let writeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Enquiries")
  writeSheet.getRange("A2:G").clearContent()
  writeSheet.getRange(2, 1, writeData.length, writeData[0].length).setValues(writeData).setHorizontalAlignment("center")
  writeSheet.getRange("A2:G").sort({column: 1, ascending: false})
  
}
