function clearNewSheet() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("New Datasheet")
  sheet.getRange("A2:U").clearContent();
  
}
function clearUESheet() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Unit Enrolments")
  sheet.getRange("A2:Y").clearContent();
  
}

function addeftsl() {
  let sheet1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("New Datasheet")
  let sheet1Data = sheet1.getDataRange().getValues()
  let sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Course Enrollments Masterlist")
  let sheet2Data = sheet2.getDataRange().getValues()
  sheet1Data.shift()
  sheet2Data.shift()
  
  sheet1Data.forEach(function(row) {
    let index = sheet2Data.findIndex((el) => el[0] == row[0])
    let oldData = sheet2Data.find((el) => el[0] == row[0])
    if(index != -1) {
      sheet2Data[index][20] = row[20]
    }
    })
  sheet2.getRange(2,1,sheet2Data.length,sheet2Data[0].length).setValues(sheet2Data).setHorizontalAlignment("center");
}

function getDaysDiff(first, second) {
  let date1 = new Date(first)
  let date2 = new Date(second)
  let days = Math.round((date2 - date1) / (1000 * 60 * 60 * 24)+0.4)
  return days
}

function test() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Course Enrollments Masterlist")
  let sheetData = sheet.getDataRange().getValues()
  sheetData.shift()
  sheetData.forEach(function(row) {
    if(row[6] != "") {
      row[6] = new Date(row[6])
    }
    if(row[7] != "") {
      row[7] = new Date(row[7])
    }
    if(row[8] != "") {
      row[8] = new Date(row[8])
    }
    if(row[9] != "") {
      row[9] = new Date(row[9])
    }
    if(row[10] != "") {
      row[10] = new Date(row[10])
    }
    if(row[11] != "") {
      row[11] = new Date(row[11])
    }
    if(row[15] != "") {
      row[15] = new Date(row[15])
    }
    if(row[18] != "") {
      row[18] = new Date(row[18])
    }
    if(row[19] != "") {
      row[19] = new Date(row[19])
    }
  })
  
  sheet.getRange(2, 1, sheetData.length, sheetData[0].length).setValues(sheetData).setHorizontalAlignment("center")
}

function refreshPage1() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("New Datasheet")
  let sheetData = sheet.getDataRange().getValues()
  sheetData.shift()
  let data = []
  sheetData.forEach(function(row) {
    let datehold = new Date(row[7])
    if(datehold.getFullYear() >= 2019) {
      let hold = []
        hold.push(row[0])
        hold.push(row[2])
        hold.push(row[3])
        hold.push(row[4])
        hold.push(row[5])
        hold.push(row[17])
        hold.push(row[16])
        hold.push(row[7])
        hold.push(row[8])
        hold.push(row[12])
        hold.push(row[13])
        hold.push(row[14])
        data.push(hold)
    }
  })

  let sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Course Enrollments")
  sheet2.getRange("A2:L").clearContent()
  sheet2.getRange(2,1,data.length,data[0].length).setValues(data).setHorizontalAlignment("center")
  sheet2.getRange("A2:L").sort({column: 1, ascending: false})
}