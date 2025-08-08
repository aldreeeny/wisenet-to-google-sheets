function refreshMasterlist() {
  let sheet1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("New Datasheet")
  let sheet1Data = sheet1.getDataRange().getValues()
  let sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Course Enrollments Masterlist")
  let sheet2Data = sheet2.getDataRange().getValues()
  sheet1Data.shift()
  sheet2Data.shift()
  let count = 1
  
  
  sheet1Data.forEach(function(row) {
    let index = sheet2Data.findIndex((el) => el[0] == row[0])
    let oldData = sheet2Data.find((el) => el[0] == row[0])
    if(oldData != undefined) {
      if(row[12] == "Current" && oldData[12] != "Current" && row[10] == "") {
      // Enquiry to Current, no Enrollment Date
        oldData[12] = row[12]
        oldData[10] = new Date()
        let hold = []
        hold.push(oldData)
        sheet2.getRange((index+2), 1, hold.length, hold[0].length).setValues(hold).setHorizontalAlignment("center")
      } else if(row[12] == "Current" && oldData[12] != "Current" && row[10] != "") {
      // Enquiry to Current, has Enrollment Date
        oldData[12] = row[12]
        oldData[10] = row[10]
        let hold = []
        hold.push(oldData)
        sheet2.getRange((index+2), 1, hold.length, hold[0].length).setValues(hold).setHorizontalAlignment("center")
      } else if(row[12] == "Withdrawn" && oldData[12] == "Current") {
      // Current to Withdrawn
        oldData[12] = row[12]
        oldData[21] = new Date()
        let hold = []
        hold.push(oldData)
        sheet2.getRange((index+2), 1, hold.length, hold[0].length).setValues(hold).setHorizontalAlignment("center")
      } else if(row[12] == "Declined" && oldData[12] != "Declined") {
      // Declined
        oldData[12] = row[12]
        oldData[22] = new Date()
        let hold = []
        hold.push(oldData)
        sheet2.getRange((index+2), 1, hold.length, hold[0].length).setValues(hold).setHorizontalAlignment("center")
      }
    } else{
      let hold = []
      let hold2 = []
      row.forEach(function(data) {
        hold.push(data)
      })
      hold.push("")
      if(hold[9] == "") {
        hold[9] = new Date()
      }
      hold2.push(hold)
      sheet2.getRange((sheet2Data.length+count), 1, hold2.length, hold2[0].length).setValues(hold2).setHorizontalAlignment("center")
      sheet2.getRange("A2:W").sort({column: 1, ascending: false})
      count++
    }
  })
}

