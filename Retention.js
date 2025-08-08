function getRetentions() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Course Enrollments Masterlist")
  let sheetData = sheet.getDataRange().getValues()
  sheetData.shift()
  let sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Completed")
  let sheetData2 = sheet2.getDataRange().getValues()
  sheetData2.shift()
  let data = []
  sheetData2.forEach(function(row) {
    data.push(row)
  })
  sheetData.forEach(function(row) {
    if(row[15] != "") {
      if(data.length == 0) {
        let datehold = new Date(row[10])
        if(datehold.getFullYear()>=2019){
          let hold = []
          hold.push(row[16])
          hold.push(row[17])
          hold.push(row[15])
          hold.push(0)
          hold.push("")
          hold.push("")
          hold.push("")
          hold.push("")
          hold.push("")
          hold.push("")
          hold.push("")
          data.push(hold)
        }
      } else {
        let find = data.find((as) => as[1] == row[17] && as[0] == row[16] && as[2].valueOf() == row[15].valueOf() && row[15] != "")
        if(find == undefined) {
          let datehold = new Date(row[10])
          if(datehold.getFullYear()>=2019){
            let hold = []
            hold.push(row[16])
            hold.push(row[17])
            hold.push(row[15])
            hold.push(0)
            hold.push("")
            hold.push("")
            hold.push("")
            hold.push("")
            hold.push("")
            hold.push("")
            hold.push("")
            data.push(hold)
          }
        } 
      }
    }
    
  })
 
  sheet2.getRange(2,1,data.length,data[0].length).setValues(data).setHorizontalAlignment("center");
  sheet2.getRange("A2:I").sort({column: 3, ascending: false})
}

function refreshRetentionsGraph() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Course Enrollments Masterlist")
  let sheetData = sheet.getDataRange().getValues()
  sheetData.shift()

  let writeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Completed")
  let writeSheetData = writeSheet.getDataRange().getValues()
  writeSheetData.shift()
  let data = []
  writeSheetData.forEach(function(row) {
    let censusDate = new Date(row[2])
    let currDate = new Date()
    if(censusDate.valueOf() == currDate.valueOf()) {
      let filtered = sheetData.filter((zxc) => {
        let d1 = new Date(zxc[15])
        let d2 = new Date(row[2])
        
        if(zxc[16] == row[0] && zxc[17] == row[1] && d1.valueOf() == d2.valueOf()) {
        return true }
        else { return false }
      })


      let withdraw = 0
      let current = 0 
      let completed = 0
      let declined = 0
      let eftsl = 0
      filtered.forEach(function(asd) {
        if(asd[12] == "Current") {
          current++
          eftsl += (+asd[20])
        } else if(asd[12] == "Withdrawn" && asd[20] != "" && asd[15] != ""){
          let cens = new Date(asd[21])
          let curr = new Date(asd[15])
          if(cens.valueOf() < curr.valueOf()) {
            withdraw++
          }
        } else if(asd[12] == "Completed") {
          completed++
        } else if(asd[12] == "Declined") {
          declined++
        }
      })
      row[3] = current
      row[4] = withdraw
      row[5] = current
      row[6] = completed
      row[7] = declined
      row[8] = withdraw + current + completed + declined
      
    } else if(censusDate.valueOf() < currDate.valueOf()) {
      let filtered = sheetData.filter((zxc) => {
        let d1 = new Date(zxc[15])
        let d2 = new Date(row[2])
        
        if(zxc[16] == row[0] && zxc[17] == row[1] && d1.valueOf() == d2.valueOf()) {
        return true }
        else { return false }
      })


      let withdraw = 0
      let current = 0 
      let completed = 0
      let declined = 0
      let eftsl = 0
      filtered.forEach(function(asd) {
        if(asd[12] == "Current") {
          current++
          eftsl += (+asd[20])
        } else if(asd[12] == "Withdrawn" && asd[20] != "" && asd[15] != ""){
          let cens = new Date(asd[21])
          let curr = new Date(asd[15])
          if(cens.valueOf() < curr.valueOf()) {
            withdraw++
          }
        } else if(asd[12] == "Completed") {
          completed++
        } else if(asd[12] == "Declined") {
          declined++
        }
      })
      row[4] = withdraw
      row[5] = current
      row[6] = completed
      row[7] = declined
      row[8] = withdraw + current + completed + declined
      if(row[3] == "") {
        row[3] = 0
      }
    } else {
      let withdraw = 0
      let current = 0 
      let completed = 0
      let declined = 0
      let eftsl = 0
      let filtered = sheetData.filter((zxc) => {
        let d1 = new Date(zxc[15])
        let d2 = new Date(row[2])
        
        if(zxc[16] == row[0] && zxc[17] == row[1] && d1.valueOf() == d2.valueOf()) {
        return true }
        else { return false }
      })
      filtered.forEach(function(asd) {
        if(asd[12] == "Current") {
          current++
          eftsl += (+asd[20])
        } else if(asd[12] == "Withdrawn" && asd[21] != "" && asd[15] != ""){
          let cens = new Date(asd[21])
          let curr = new Date(asd[15])
          if(cens.valueOf() > curr.valueOf()) {
            withdraw++
          }
        } else if(asd[12] == "Completed") {
          completed++
        } else if(asd[12] == "Declined") {
          declined++
        }
      })
      row[4] = withdraw
      row[5] = current
      row[6] = completed
      row[7] = declined
      row[8] = filtered.length
    }

  })

  writeSheet.getRange(2, 1, writeSheetData.length, writeSheetData[0].length).setValues(writeSheetData).setHorizontalAlignment("center")
}
