// if you don't specify a html file, the sniper will generate a div
var app = require("biojs-vis-interactions-heatmap-d3");
var instance = new app({
  target: "snippetDiv", 
			width: 700,
			height: 350
}); 

for (var pid=1;pid<=15;pid++)
  instance.addProtein({ "id":"prot_"+pid,"name":pid,"showLegend":false,"typeLegend":"id","organism":"human"+pid%3,"features":{"f1":Math.random(),"f2":"val2","f3":"val3"}});

for (var pid=1;pid<=30;pid++)
  instance.addInteraction("prot_"+Math.floor((Math.random()*15)+1),"prot_"+Math.floor((Math.random()*15)+1) ,{score:Math.random()});


instance.restart();

//paint the proteins
for (var pid=1;pid<=15;pid++)
	  for (var pid2=pid+1;pid2<=15;pid2++){
	    var rgb = "rgb("+(256-pid*10)+","+pid2*10+",0)";
	    instance.setFillColor("#cell_prot_"+pid+"_prot_"+pid2,rgb);
	    instance.setFillColor("#cell_prot_"+pid2+"_prot_"+pid,rgb);
	  }


//play with the events to make it interactive
instance.on("proteinMouseOver", function( p ) {
    instance.activateProteins([p.protein]);
});
instance.on("proteinMouseOut", function( p ) {
    instance.deactivateProteins();
});
instance.on("interactionMouseOver", function( p ) {
  instance.activateProteins([p.interaction.source,p.interaction.target]);
});
instance.on("interactionMouseOut", function( p ) {
    instance.deactivateProteins();
});
//show the features information in the panels
var selected = null;
instance.on("interactionClick", function( d ) {
  if ("#cell_"+d.interaction.id==selected){
    instance.highlight("#cell_"+d.interaction.id,false);
    instance.updateInfoFrame(null,"left");
    instance.updateInfoFrame(null,"right");
    selected=null;
  }else{
    if (selected!=null){
      instance.highlight(selected,false);
    }
    instance.updateInfoFrame(d.interaction.source,"left");
    instance.updateInfoFrame(d.interaction.target,"right");
    instance.highlight("#cell_"+d.interaction.id);
    selected="#cell_"+d.interaction.id;
  }
});
