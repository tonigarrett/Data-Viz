
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
  var _rates = table.getColumn("rate");
  newDates = [];
  ints_total = [];
  rates = [];
  console.log(rates);

  for (var i = 0; i < _dates.length; i++) {
    var dt = formatDate(_dates[i]);
    var int = parseFloat(total[i]);
  

    ints_total.push(int)
    newDates.push(dt);
    rates.push(_rates[i]);
  }


  var ctx = document.getElementById("chart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: newDates,
      datasets: [{
        label: "Total Volume (million)", // title of graph
        hoverBackgroundColor: "#59597F",
        hoverBorderColor: "#c00",
        backgroundColor: "rgba(204, 0, 0, 0.4)",
        borderWidth: "2",
        data: ints_total, // data values array being graphed
      }, {
        label: "Rates",
        data: rates,
        backgroundColor: "grey",
        borderColor: "grey",
        borderWidth: 1,
        type: "line",
        YAxisID: "rate",
        fill: false,
        
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        yAxes: [{
          id: "totalvolume",
            display: true,
              position: "left",
                type: "linear",
        scaleLabel: {
          display: true,
            labelString: "US$",
              beginAtZero: true}
        }, {
          id: "rate",
          display: true,
          type: "linear",
          position: "right",
          ticks: { min: -0.6, max: 3, stepSize: 0.2},
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true,
            labelString: "Rate"
          }


        }]
      }
    }
  });
}

