var offsetTop;
var offsetLeft;

function plotBarChart(json,divId,width,height,barHeight,jump,colorMap){
	mapa = [];	
	mapeia(mapa,json.twitter,width,0);
	mapeia(mapa,json.facebook,width,1);
	mapeia(mapa,json.instagram,width,2);	
		
	var svg = d3.select("#" + divId).append("svg")
    .attr("width", width)
    .attr("height", height);

    var bars = svg.selectAll("rect").data(mapa).enter().append("rect");

    bars.attr("x",function(d){return d.x0})
    .attr("y", function(d){return d.line*jump + d.line*barHeight;})
    .attr("width",function(d){return d.w;})
    .attr("height",barHeight)
    .style("fill",function(d){return colorMap[d.tema];})
    .on("mouseover", function(d){
    	tooltip.text((d.percentual * 100).toFixed(2) + "% " + d.tema.toUpperCase());    		
    	tooltip.style("top", ((d.line + 1)*barHeight + d.line*(jump) + offsetTop) + "px")
    	.style("left",(d.x0 + d.w*0.2 + offsetLeft)+"px")
    	.style("visibility", "visible");
    })		
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});

	divData = d3.select("#" + divId)[0][0];
	offsetTop = divData.offsetTop;
	offsetLeft = divData.offsetLeft;

	var tooltip = d3.select("#" + divId)
	.append("div")
	.attr("class","tooltip")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden");    		
}

function mapeia(mapa, rede, width, indice){
	total = soma(rede);
	x0 = 0;
	for(i in rede){
		p = rede[i]/total;
		insert = {"tema":i, "x0":x0, "count":rede[i], "percentual":p,"w":width*p, "line":indice};
		x0 = x0 + width*p;
		mapa.push(insert);
	}
}

function soma(rede){
	return rede.lgbt + rede.genero + rede.negros + rede.indigena;
}
