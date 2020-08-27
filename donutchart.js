var table;

function preload() {
  table = loadTable("./data/triparty.csv", "csv", 'header')
}

var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 400;
myCanvas.height = 400;

var ctx = myCanvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.stroke();
}

function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
}

function setup(index) {
  drawChartByIndex(1)
  
}

function drawChartByIndex(index) {

  test = {}

  console.log(index)
 
  var Agency = table.getColumn("agency")[index];
  var Agency_mbs = table.getColumn("agency_mbs")[index];
  var Treasury = table.getColumn("treasury")[index];
  var date = table.getColumn("date")[index];
  
  test.Treasury = parseFloat(Treasury);
  test.Agency_mbs = parseFloat(Agency_mbs);
  test.Agency = parseFloat(Agency);

  console.log(test)

  var Piechart = function (options) { //stores options passed as parameters
    this.options = options;
    this.canvas = options.canvas; // stores canvas reference 
    this.ctx = this.canvas.getContext("2d"); //creates drawing context stored as a class member
    this.colors = options.colors; // stores colours array passed as options
    // this.fillFocus = (99, 99, 255);
    // this.fillNoFocus = (89, 49, 189);
    // this.fill = this.fillNoFocus;
    // this.hasFocus = false;

    // draws data from the data model 
    this.draw = function () {
      var total_value = 0;
      var color_index = 0;
      for (var value in this.options.data) {
        console.log(value) // returns the 3 categories of data to be displayed
        var val = this.options.data[value];
        total_value += val; // calculates sum of all values in the data table
      }

      console.log(this.options)

      if (this.options.legend) {
        color_index = 0;
        var legendHTML = "";
        console.log(this.options.data)
        for (value in this.options.data) {
          legendHTML += "<div><span style='display:inline-block;width:20px;background-color:" + this.colors[color_index++] + ";'>&nbsp;</span> " + value + "</div>";
        }
        this.options.legend.innerHTML = legendHTML;
      }

      var start_angle = 0;
      for (value in this.options.data) {
        val = this.options.data[value];
        var slice_angle = (2 * Math.PI * val / total_value); // calculates the pie slice angle for each category in the data table 

        // uses the centre of the canvas to draw the centre of the slice 
        drawPieSlice(
          this.ctx,
          this.canvas.width / 2,
          this.canvas.height / 2,
          Math.min(this.canvas.width / 2, this.canvas.height / 2), // draws to within the canvas size
          start_angle,
          start_angle + slice_angle,
          this.colors[color_index % this.colors.length]
        );

        start_angle += slice_angle;
        color_index++;

      }

      //drawing a white circle over the chart
      //to create the doughnut chart using the same centre as a normal pie chart 
      if (this.options.doughnutHoleSize) {
        start_angle = 0;
        for (categ in this.options.data) {
          val = this.options.data[categ];
          slice_angle = (2 * Math.PI * val / total_value);
          var pieRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2); // prevents graph from going outside of the canvas size 
          var labelXPos = this.canvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
          var labelYPos = this.canvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);

          if (this.options.doughnutHoleSize) {
            var offset = ((pieRadius / 2) * this.options.doughnutHoleSize); // to prevent overlap of slices 
            labelXPos = this.canvas.width / 2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
            labelYPos = this.canvas.height / 2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
          }

          var labelText = (100 * val / total_value).toFixed(2);
          this.ctx.fillStyle = "#2E4053";
          this.ctx.font = "bold 14px Arial";
          this.ctx.fillText(categ + ": ", labelXPos - 30, labelYPos);
          this.ctx.fillText("US$ " + val + " mln", labelXPos - 45, labelYPos + 15);
          this.ctx.fillText(date, pieRadius, pieRadius);
console.log(date)
          
          
          start_angle += slice_angle;
        }
        drawPieSlice(
          this.ctx,
          this.canvas.width / 2,
          this.canvas.height / 2,
          this.options.doughnutHoleSize * Math.min(this.canvas.width / 2, this.canvas.height / 2),
          0,
          2 * Math.PI,
          "#ffffff",
          //this.ctx.fillText(total_value.toFixed(2) + " mln", doughnutHoleSize.centerX, doughnutHoleSize.centerY),
        );

        // if (this.options.legend) {
        //   color_index = 0;
        //   var legendHTML = "";
        //   for (categ in this.options.data) {
        //     legendHTML += "<div><span style='display:inline-block;width:20px;background-color:" + this.colors[color_index++] + ";'>&nbsp;</span> " + categ + "</div>";
        //   }
        //   this.options.legend.innerHTML = legendHTML;
        // }
      }
    }
  }

  //var myLegend = document.getElementById("myLegend");

  var myDougnutChart = new Piechart(
    {
      canvas: myCanvas,
      data: test,
      colors: ["#E6B0AA  ", "#A9CCE3", "#A3E4D7"],
      doughnutHoleSize: 0.5,
      //legend: myLegend,
    }
  );
  myDougnutChart.draw();
}
