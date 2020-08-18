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

var myVinyls = {
  "Classical music": 12.3,
  "Alternative rock": 14.5,
  "Pop": 2.56,
  "Jazz": 12.90
};

var Piechart = function (options) {
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;
  this.fillFocus = (99, 99, 255);
  this.fillNoFocus = (89, 49, 189);
  this.fill = this.fillNoFocus;
  this.hasFocus = false;


  this.draw = function () {
    var total_value = 0;
    var color_index = 0;
    for (var categ in this.options.data) {
      var val = this.options.data[categ];
      total_value += val;
    }

    if (this.options.legend) {
      color_index = 0;
      var legendHTML = "";
      for (categ in this.options.data) {
        legendHTML += "<div><span style='display:inline-block;width:20px;background-color:" + this.colors[color_index++] + ";'>&nbsp;</span> " + categ + "</div>";
      }
      this.options.legend.innerHTML = legendHTML;
    }

    var start_angle = 0;
    for (categ in this.options.data) {
      val = this.options.data[categ];
      var slice_angle = 2 * Math.PI * val / total_value;

      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.min(this.canvas.width / 2, this.canvas.height / 2),
        start_angle,
        start_angle + slice_angle,
        this.colors[color_index % this.colors.length]
      );



      start_angle += slice_angle;
      color_index++;


    }

    //drawing a white circle over the chart
    //to create the doughnut chart
    if (this.options.doughnutHoleSize) {
      start_angle = 0;
      for (categ in this.options.data) {
        val = this.options.data[categ];
        slice_angle = 2 * Math.PI * val / total_value;
        var pieRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2);
        var labelX = this.canvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
        var labelY = this.canvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);

        if (this.options.doughnutHoleSize) {
          var offset = (pieRadius * this.options.doughnutHoleSize) / 2 + 5;
          labelX = this.canvas.width / 2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
          labelY = this.canvas.height / 2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
        }

        var labelText = (100 * val / total_value).toFixed(2);
        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 18px Arial";
        this.ctx.fillText(labelText + "%", labelX, labelY);
        start_angle += slice_angle;
      }
      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.options.doughnutHoleSize * Math.min(this.canvas.width / 2, this.canvas.height / 2),
        0,
        2 * Math.PI,
        "#f6eeec"
      );

      if (this.options.legend) {
        color_index = 0;
        var legendHTML = "";
        for (categ in this.options.data) {
          legendHTML += "<div><span style='display:inline-block;width:20px;background-color:" + this.colors[color_index++] + ";'>&nbsp;</span> " + categ + "</div>";
        }
        this.options.legend.innerHTML = legendHTML;
      }
    }

  }
}

var myLegend = document.getElementById("myLegend");

var myDougnutChart = new Piechart(
  {
    canvas: myCanvas,
    data: myVinyls,
    colors: ["#fde23e", "#f16e23", "#57d9ff", "#937e88"],
    doughnutHoleSize: 0.4,
    legend: myLegend,
  }
);
myDougnutChart.draw();