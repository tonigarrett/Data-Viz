table = [];

function preload() {
  table = loadTable("./data/triparty.csv", "csv", 'header')

  myCanvas = document.getElementById("myCanvas");
  myCanvas.width = 1024;
  myCanvas.height = 574;
  
  ctx = myCanvas.getContext("2d");
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
  var _rates = table.getColumn("rate");
  newDates = [];
  ints_total = [];
  rates = [];
console.log(loadTable);

var data = {}

  for(var i=0; i < _dates.length; i++){
    var dt = formatDate(_dates[i]);
    var int = parseFloat(total[i]);

    ints_total.push(int);
    newDates.push(dt);
    rates.push(_rates[i]);
    data[dt] = int
  }


  var myBarchart = new Barchart(
    {
      canvas: myCanvas,
      seriesName: "Total Volume (millions US$)",
      padding: 50,
      gridScale: 250, // gridlines every "" units
      gridColor: "#eeeeee",
      data: ints_total,
      //data: ints_total,
      colors: ["rgba(200, 100, 100, 0.4)"]
    }
  );
  myBarchart.draw();

}

// helper functions
function drawLine(ctx, startX, startY, endX, endY, color) {
  ctx.save(); // specifically to store and save these context within the function  
  ctx.strokeStyle = color; // determines strokeline color
  ctx.beginPath(); // line draw call 
  ctx.moveTo(startX, startY); // starting point of line draw at x, y
  ctx.lineTo(endX, endY); // end point of line draw at x, y
  ctx.stroke(); // actual drawing 
  ctx.restore(); // restores these colors within the function 
}

// draws the rectangular bars to represent the bar graph using these 6 parameters referenced to the drawing context 
function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color, label="hello") {
  console.log("") // array of data =26
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillText("hello", this.canvas.width / 2, this.canvas.height);
  ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  ctx.restore();
}


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

    //drawing the grid lines horizontally 
    var gridValue = 0;
    while (gridValue <= maxValue) {
      var gridY = canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;
      var gridX = canvasActualWidth * (1 - gridValue / barSize) + this.options.padding;
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
      this.ctx.fillText(gridValue, 1, gridX - 2);
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
        barSize-5, // allows gaps between each bar 
        barHeight,
        this.colors[barIndex % this.colors.length],
        categ
      );

      barIndex++;
    }

    //drawing series name
    this.ctx.save();
    // this.ctx.textBaseline = "bottom";
    this.ctx.textAlign = "center"; // position of title or series name
    this.ctx.fillStyle = "#000000";
    this.ctx.font = "12px Arial";
    this.ctx.fillText(this.options.seriesName, this.canvas.width / 2, this.canvas.height/25);
    this.ctx.fillText(newDates[3], this.canvas.width/2, this.canvas.height-50)
    this.ctx.restore();

    for(var i=0; i<newDates.length; i++) {
      font = 10;
      this.ctx.save();
      this.ctx.translate(font, barSize);
      this.ctx.rotate(-Math.PI/2);
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "grey";
      this.ctx.font = font + "px Arial";
      this.ctx.fillText(newDates, -50, 300);
    };
    



    //draw legend
    barIndex = 0;
    var legend = document.querySelector("legend[for='myCanvas']");
    var ul = document.createElement("ul");
    legend.append(ul);
    //for (categ in this.options.data) {
    for(newDates in this.options.data) {  
    var li = document.createElement("li");
      li.style.listStyle = "none";
      li.style.borderLeft = "20px solid " + this.colors[barIndex % this.colors.length];
      li.style.padding = "5px";
      //li.textContent = categ;
      li.textContent = newDates;
      ul.append(li);
      barIndex++;
    }
  }
}





