
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



  for (var i = 0; i < _dates.length; i++) {
    var dt = formatDate(_dates[i]);
    var int = parseFloat(total[i]);
    var rt = parseFloat(_rates[i]);
    console.log(rates);

    ints_total.push(int)
    newDates.push(dt);
    rates.push(rt);
  }
  // function breakdown() {
  //   document.getElementById("demo").innerHTML = breakdown();
  // }
  // window.onLoad = function () {
  //   var btn = document.getElementById("myButton");
  //   btn.onclick = breakdown;
  // }

  var repo = new Chart(document.getElementById("myChart").getContext("2d"), {
    type: "bar", // defines overall chart type
    data: {
      labels: newDates, // data for x-axis
      datasets: [{
        type: "line", //defines dataset type 
        label: "Rate", // legend
        fill: false,
        hoverBackgroundColor: "#59597F",
        hoverBorderColor: "#c00",
        backgroundColor: "grey",
        borderColor: "grey",
        borderWidth: 1,
        data: rates, // data values array being graphed for bar graph
        yAxisID: "rate-axis"
      }, {
        label: "Total Volume (millions US$)", // legend
        fill: true,
        data: ints_total, // data values being graphed for line chart
        hoverBackgroundColor: "#59597F",
        hoverBorderColor: "#c00",
        backgroundColor: "rgba(204, 0, 0, 0.4)",
        yAxisID: "volume-axis"
      }]
    },
    // display properties
    options: {
      legend: { position: "bottom", usePointStyle: true },
      responsive: true,
      maintainAspectRatio: true,
      tooltips: { mode: "index", intersect: false }, // displays both data on hover
      hover: { mode: "nearest", intersect: true },
      scales: {
        xAxes: [{
          display: true, stacked: true, scaleLabel: { display: false, labelString: "Date" }
        }],
        yAxes: [{
          type: "linear",
          id: "volume-axis",
          display: true,
          position: "left",
          scaleLabel: { display: true, labelString: "Total Volume" }
        }, {
          type: "linear",
          id: "rate-axis",
          display: true,
          position: "right",
          stacked: false,
          scaleLabel: { display: true, labelString: "Rate %" },
          gridLines: { drawOnChartArea: false }
        }],
        
      },
      onClick: function(e, items){
        console.log(e);
        console.log(items);
        var points = repo.getElementsAtEvent(e);
        console.log(points[0]._index);
        
      }
    }
  });

}
