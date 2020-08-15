this.loaded = false;

this.preload = function () {
  this.data = loadTable("./data/triparty.csv", "csv", 'header')
}

function formatDate(datestr){
  var regex = /(\d{4})(\d{2})(\d{2})/;
  dates = regex.exec(datestr);
  // date = new Date(year=dates[1], month=dates[2], day=dates[3]);
  var newformat = dates[1] + "-" + dates[2] + "-" + dates[3]
  return newformat;
}

var layout = {
  leftMargin: "100",
  rightMargin: "width",
  topMargin: "30",
  bottomMargin: "height",
  pad: "5"
};

function setup() {
  createCanvas(1024, 576);
  background(200);

  var dates = this.data.getColumn("date");
  var startDate = dates[0];
  var endDate = dates[dates.length - 1];
  var total = this.data.getColumn("total");

  newDates = []
  ints_total = []

  for(var i=0; i < dates.length; i++){
    var dt = formatDate(dates[i]);
    var int = parseFloat(total[i]);

    ints_total.push(int)
    newDates.push(dt);
  }


  return;


  var numMonths = dates.length;

  // find min and max totals for mapping to canvas height
  var minTotal = min(totals);
  console.log(minTotal);
  var maxTotal = max(this.data.getColumn('total'));
  console.log(maxTotal);



  //find mean total to plot the average marker // is this necessary?? 
  var meanTotal = minTotal + maxTotal / 2;
  console.log(meanTotal);

  // loop over all rows 
  for (var i = 0; i < this.data.getRowCount(); i++) {

    // create an object to store data for the current date
    var current = {
      // converting strings to numbers
      'date': this.data.getNum(i, 'date'),
      'total': this.data.getNum(i, 'total')
    };
    console.log(current);
  }
}
// all works to here !!

this.draw = function () {
  if (!this.loaded) {
    console.log('data not yet loaded'); // still works!! data is loaded = true
    return;
  }
  // calculates line height to map to the canvas size         
  var lineHeight = (height - this.layout.topMargin) / this.data.getRowCount();
  console.log(lineHeight);
  // calculates plot width to map to canvas size 
  //var w = width / numMonths; // this numMonths is not working, why?? I've defined it above line 31//
  // console.log(w);


  // loop through  // is this needed because I have already looped through above line 44?? //       
  var dates = this.data.getColumns("date");
  for (var i = 0; i < this.data.getRowCount('date').length; i++) {
    console.log(this.data)
    fill(204, 255, 255, 127);
    rect(this.layout.leftMargin, lineY, (width - 1) / 26, lineHeight);
  }

  //practice code using simple data points for rect and line to draw a bar graph

  //Set colors pink
  fill(204, 101, 192, 127);
  stroke(204, 101, 192);

  //A rectangle (x, y, width, height) where y+height forms x- axis line
  rect(30, 120, 20, 120);
  rect(55, 90, 20, 150);
  rect(80, 190, 20, 50);
  rect(105, 160, 20, 80);
  rect(130, 40, 20, 200);
  line(25, 240, 155, 240);
  line(25, 0, 25, 240); // y-axis line

  push(); // to control translate positions to just this section 
  translate(43, 265);

  rotate(3 * PI / 2); // drawn text vertically using rotate()
  textSize(10);
  text("Aug", 0, 0);
  text("Sept", 0, 25);
  text("Oct", 0, 50);
  text("Nov", 0, 75);
  text("Dec", 0, 100);
  pop();


  fill(104, 101, 192, 127); //purple
  stroke(127, 63, 120);

  rect(180, 300, 20, 100);
  rect(205, 200, 20, 200);
  rect(230, 190, 20, 210);
  rect(255, 160, 20, 240);
  rect(280, 40, 20, 360);
  line(175, 0, 175, 400); //y-axis line
  line(175, 400, 310, 400); // xaxis line 



  fill(0, 250, 200, 127); //green
  stroke(127, 63, 120);
  // A rectangle where y+height of rect forms x-axis
  rect(330, 60, 20, 60);
  rect(355, 40, 20, 80);
  rect(380, 80, 20, 40);
  rect(405, 50, 20, 70);
  rect(430, 70, 20, 50);
  line(325, 120, 460, 120); // x-axis line x, y, width, y
  line(325, 0, 325, 120); //y-axis line x, y, x, 120

  fill(90);
  noStroke();
  textSize(10); // text is drawn horizontally 
  text("Aug", 330, 130);
  text("Sept", 355, 130);
  text("Oct", 380, 130);
  text("Nov", 405, 130);
  text("Dec", 430, 130);
  text("Volume", 280, 20);
  text("millions $", 277, 30);
}

