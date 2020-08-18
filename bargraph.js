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

    ints_total.push(int);
    newDates.push(dt);
  }

  //var ctx = document.getElementById("chart").getContext("2d");
  // var chart = new Chart(
  //   ctx, {
  //   type: "bar",
  //   data: {
  //     labels: newDates,
  //     datasets: [{
  //       label: "Total Volume",
  //       data: ints_total
  //     }]
  //   }
  // });

}
var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 1024;
myCanvas.height = 574;

var ctx = myCanvas.getContext("2d");
// }

// helper functions
function drawLine(ctx, startX, startY, endX, endY, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

//modifies color settings 
function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  ctx.restore();
}

var myVinyls = {
  "January": 100,
  "February": 280,
  "March": 598,
  "April": 128
};

var Barchart = function (options) {
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;


  this.draw = function () {
    // scaled to the size of the canvas using maximum values
    var maxValue = 0;
    for (var categ in this.options.data) {
      maxValue = Math.max(maxValue, this.options.data[categ]);
    }
    // height and width of canvas with padding options 
    var canvasActualHeight = this.canvas.height - this.options.padding * 2;
    var canvasActualWidth = this.canvas.width - this.options.padding * 2;

    //drawing the grid lines
    var gridValue = 0;
    while (gridValue <= maxValue) {
      var gridY = canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;
      drawLine(
        this.ctx,
        0,
        gridY,
        this.canvas.width,
        gridY,
        this.options.gridColor
      );

      //writing grid markers
      this.ctx.save();
      this.ctx.fillStyle = this.options.gridColor;
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(gridValue, 1, gridY - 2);
      this.ctx.restore();

      gridValue += this.options.gridScale;
    }

    //drawing the bars
    var barIndex = 0;
    var numberOfBars = Object.keys(this.options.data).length;
    var barSize = (canvasActualWidth) / numberOfBars;

    for (categ in this.options.data) {
      var val = this.options.data[categ];
      var barHeight = Math.round(canvasActualHeight * val / maxValue);

      drawBar(
        this.ctx,
        this.options.padding + barIndex * barSize,
        this.canvas.height - barHeight - this.options.padding,
        barSize,
        barHeight,
        this.colors[barIndex % this.colors.length]
      );

      barIndex++;
    }

    //drawing series name
    this.ctx.save();
    this.ctx.textBaseline = "bottom";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#000000";
    this.ctx.font = "bold 14px Arial";
    this.ctx.fillText(this.options.seriesName, this.canvas.width / 2, this.canvas.height);
    this.ctx.restore();

    //draw legend
    barIndex = 0;
    var legend = document.querySelector("legend[for='myCanvas']");
    var ul = document.createElement("ul");
    legend.append(ul);
    for (categ in this.options.data) {
      var li = document.createElement("li");
      li.style.listStyle = "none";
      li.style.borderLeft = "20px solid " + this.colors[barIndex % this.colors.length];
      li.style.padding = "5px";
      li.textContent = categ;
      ul.append(li);
      barIndex++;
    }
  }
}


var myBarchart = new Barchart(
  {
    canvas: myCanvas,
    seriesName: "Total Volume (millions US$)",
    padding: 20,
    gridScale: 100, // gridlines every "" units
    gridColor: "#eeeeee",
    data: myVinyls,
    //data: ints_total,
    colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"]
  }
);
myBarchart.draw();