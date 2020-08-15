// this.loaded = false;

// this.preload = function() {
//     var self = this;
//     this.data = loadTable('./data/triparty.csv', 'csv', 'header',
//         function(table) {
//             self.loaded = true;
//         });
// };


// var layout = {
//     leftMargin: "100",
//     rightMargin: "width",
//     topMargin: "30", 
//     bottomMargin: "height",
//     pad: "5"
// };

var table;

function preload() {
  table = loadTable("./data/triparty.csv", "csv", 'header')
}

function formatDate(datestr){
  var regex = /(\d{4})(\d{2})(\d{2})/;
  dates = regex.exec(datestr);
  // date = new Date(year=dates[1], month=dates[2], day=dates[3]);
  var newformat = dates[1] + "-" + dates[2] + "-" + dates[3]
  return newformat;
}

function setup() {
  var _dates = table.getColumn("date");
  var total = table.getColumn("total");
  newDates = []
  ints_total = []

  for(var i=0; i < _dates.length; i++){
    var dt = formatDate(_dates[i]);
    var int = parseFloat(total[i]);

    ints_total.push(int)
    newDates.push(dt);
  }
  var ctx = document.getElementById("chart").getContext("2d");
  var chart = new Chart(
    ctx, {
    type: "bar",
    data: {
      labels: newDates,
      datasets: [{
        label: "Totals",
        data: ints_total
      }]
    }
  });

}