
var table;

function preload() {
  table = loadTable("./data/triparty.csv", "csv", 'header')
}

function formatDate(datestr) {
  var regex = /(\d{4})(\d{2})(\d{2})/;
  dates = regex.exec(datestr);
  var newformat = dates[2] + "-" + dates[3] + "-" + dates[1]
  return newformat;
}

function setup() {
  var _dates = table.getColumn("date");
  var total = table.getColumn("total");
  var rates = table.getColumn("rate");
  newDates = []
  ints_total = []
  //rates = []

  for (var i = 0; i < _dates.length; i++) {
    var dt = formatDate(_dates[i]);
    var int = parseFloat(total[i]);

    ints_total.push(int)
    newDates.push(dt);
    //rates.push(_rates[i]);
  }
  var ctx = document.getElementById("chart").getContext("2d");
  var data = {
    labels: newDates,
    datasets: [
      {
        label: "Total Volume (million US$)",
        hoverBackgroundColor: "#59597F",
        hoverBorderColor: "#c00",
        backgroundColor: "rgba(204, 0, 0, 0.4)",
        borderWidth: "2",
        data: ints_total,
      },
      // {
      //   type: "line",
      //   data: {
      //     datasets: [{
      //       hoverBackgroundColor: "#59597F",
      //       hoverBorderColor: "#c00",
      //       backgroundColor: "rgba(204, 0, 0, 0.4)",
      //       borderWidth: "2",
      //       data: rates,
      //     }]
      //   }
      // }
    ]
  }
  var chart = new Chart(
    ctx, {
    type: "bar",
    data: data
  });



  var data2 = {
    labels: newDates,
    datasets: [
      {
        type: "line",
        data: {
          datasets: [{
            hoverBackgroundColor: "#59597F",
            hoverBorderColor: "#c00",
            backgroundColor: "rgba(204, 0, 0, 0.4)",
            borderWidth: "2",
            data: rates,
          }]
        }
      }
    ]
  }
  var lineBar = document.getElementById("chart").getContext("2d");
  new Chart(lineBar, {
    type: 'line',
    data: {
      labels: ['test'],
      datasets: [
        {
          type: "line",
          data: {
            datasets: [{
              hoverBackgroundColor: "#59597F",
              hoverBorderColor: "#c00",
              backgroundColor: "rgba(204, 0, 0, 0.4)",
              borderWidth: "2",
              data: rates,
            }]
          }
        }
      ]
    }
  });

  
}
/*
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
*/