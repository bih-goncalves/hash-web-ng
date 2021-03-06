var fill = ["#ffffff","#2b3044"];
var w;
var id;
var h;

function plotWordCloud(width, heigth, divID, data){
  w = width;
  id = divID;
  h = heigth;

  wordMap = data;

  var sizeScale = d3.scale.linear().domain([0,wordMap[0].count]).range([15,60]);

  d3.layout.cloud().size([width, heigth])
    .words(wordMap.map(function(d,i) {
    return {text: d.word, size: sizeScale(d.count)};
  }))
    .padding(0)
    .rotate(function() { return 0; })//~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw)
    .start();
}

function draw(words) {
  d3.select("#" + id).html("")
  d3.select("#" + id).append("svg")
    .attr("class","wordCloudSVG")
    .attr("width", w)
    .attr("height", h)
    .append("g")
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
    .selectAll("text")
    .data(words)
    .enter()
    .append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "Walbaum")
    .style("cursor", "pointer")
    .style("fill", function(d, i) { return fill[i%2]; })
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
  })
    .on("click",function(d){
    angular.element(document.getElementById('str_main_monitor')).scope().changeFilterWord(d.text);
  })
    .text(function(d) { return d.text; });
}