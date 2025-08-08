function calcEFTSL() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Unit Enrolments")
  let sheetData = sheet.getDataRange().getValues()
  sheetData.shift()
  let writeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EFTSL")
  let writeSheetData = writeSheet.getDataRange().getValues()
  writeSheetData.shift()
  let data = []
  sheetData.forEach(function(row){
    if(data.length == 0) {
      data.push(row[2])
      data.push(row[3])
      
    }
  })
}

function updateEftsl() {
  let writeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Completed")
  let writeSheetData = writeSheet.getDataRange().getValues()
  writeSheetData.shift()
  let rowCount = 2
  writeSheetData.forEach(function(row) {
    let eftsl = getEftsl(row[0])
    writeSheet.getRange("J"+rowCount).setValue(eftsl)
    rowCount++
  })
  
}

function getEftsl(code) {
//  let code = "20FTQTR4DIPLOMA"
  let currDate = new Date()
  let year = currDate.getFullYear()
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Unit Enrolments")
  let sheetData = sheet.getDataRange().getValues()
  sheetData.shift()
  let count = sheetData.filter((row) => {
    let dateHold = new Date(row[19])
    if(row[13] == code && row[10] == "Current" && year == dateHold.getFullYear()){
      return true
    } else { return false }
  })
  let eftsl = count.length * 0.0588
//  Logger.log(eftsl)
  return eftsl
}
