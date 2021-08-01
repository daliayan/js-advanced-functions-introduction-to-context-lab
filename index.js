// Your code here
function createEmployeeRecord(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

let createEmployeeRecords = function(employeeRowData){
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })
    return employee;
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    })
    return employee;
}

let hoursWorkedOnDate = function(employee, workDate){
    let timeIn = employee.timeInEvents.find(function(e){
            return e.date === workDate
    }) 
    let outTime = employee.timeOutEvents.find(function(e){
        return e.date === workDate
    })
    return (outTime.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, workDate){
    let workRate = hoursWorkedOnDate(employee, workDate) * employee.payPerHour
    return parseFloat(workRate.toString())
}

let allWagesFor = function(employee){
    let workDays = employee.timeInEvents.map(function(mon){
        return mon.date
    })
    let summary = workDays.reduce(function(add, int){
        return add + wagesEarnedOnDate(employee, int)
    }, 0)
    return summary
}

let calculatePayroll = function(employeeArray){
    return employeeArray.reduce(function(list, record){
        return list + allWagesFor(record)
    }, 0)
}

let findEmployeeByFirstName = function(employeeArray, firstName){
    return employeeArray.find(function(record){
        return record.firstName === firstName
    })
}