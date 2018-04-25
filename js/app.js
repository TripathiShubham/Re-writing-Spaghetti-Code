var model = {
    init: function() {
        this.masterData = {
            "noOfDays": 5
        }
        if (!localStorage.attendance) {
            this.data = {
                "Slappy the Frog": [],
                "Lilly the Lizard": [],
                "Paulrus the Walrus": [],
                "Gregory the Goat": [],
                "Adam the Anaconda": []
            }
            var keys = Object.keys(this.data);
            for (let index = 0; index > keys.length; index++) {
                for (let i = 0; i < this.masterData.noOfDays; index++) {
                    this.data[keys[index]].push("false");
                }
            }
            this.saveInLocalstorage();
        }
        this.data = JSON.parse(localStorage.attendance);
        this.masterData.attendenceData = this.data;
    },
    saveInLocalstorage: function() {
        localStorage.attendance = JSON.stringify(this.data);
    }
}

var octopus = {
    init: function() {
        model.init();
        theadView.init();
        tbodyView.init();
    },
    getData: function() {
        return model.masterData;
    },
    setData: function(studentName, index, value) {
        model.masterData.attendenceData[studentName][index] = value;
    },
    saveInLocalstorage: function() {
        model.saveInLocalstorage();
    }
}

var theadView = {
    init: function() {
        this.nameCol = document.getElementsByClassName("name-col")[0];
        var days = octopus.getData().noOfDays;
        for (let index = days; index > 0; index--) {
            var th = document.createElement("th");
            th.textContent = index;
            this.nameCol.after(th);
        }
    }
}

var tbodyView = {
    init: function() {
        this.tbody = document.getElementsByTagName("tbody")[0];
        var data = octopus.getData();
        var studentsName = Object.keys(data.attendenceData);
        var noOfDays = data.noOfDays;
        for (let index = 0; index < studentsName.length; index++) {
            var tr = document.createElement("tr");
            tr.setAttribute("class", "student");
            var tdName = document.createElement("td");
            tdName.textContent = studentsName[index];
            tr.appendChild(tdName);
            for(var i = 0; i < noOfDays; i++) {
                var tdCheckbox = document.createElement("td");
                tdCheckbox.setAttribute("class", "attend-col");
                var input = document.createElement("input");
                input.setAttribute("type", "checkbox");
                input.addEventListener("change", (function(data, studentName, i, index,) {
                    return function() {
                        octopus.setData(studentName, i, this.checked);
                        tbodyView.countMissedCol(studentName, index);
                        octopus.saveInLocalstorage();
                    }
                })(data.attendenceData[studentsName[index]][i], studentsName[index], i, index));
                input.checked = data.attendenceData[studentsName[index]][i];
                tdCheckbox.appendChild(input);
                tr.appendChild(tdCheckbox);
            }
            var tdMissedCol = document.createElement("td");
            tdMissedCol.setAttribute("class", "missed-col");
            tr.appendChild(tdMissedCol);
            this.tbody.appendChild(tr);
            this.countMissedCol(studentsName[index], index);
        }
    },
    countMissedCol: function(studentName, index) {
        var data = octopus.getData().attendenceData[studentName];
        var count = 0;
        for (let index = 0; index < data.length; index++) {
            if(data[index]) {count++;}
        }
        document.getElementsByClassName("missed-col")[index].textContent = count;
    }
}

octopus.init();