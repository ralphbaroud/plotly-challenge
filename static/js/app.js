function DemographicRep(id) {
    
    d3.json("samples.json").then((data)=> {

       var Meta = data.metadata;
       var Result = Meta.filter(meta => meta.id.toString() === id)[0];
       var DemogInfo = d3.select("#sample-metadata");
       DemogInfo.html("");
        Object.entries(Result).forEach((k) => {   
            DemogInfo.append("h5").text(k[0].toUpperCase() + ": " + k[1] + "\n");    
        });
    });
}
function ReadSamplesJSON(id) {
        d3.json("samples.json").then((data) => {
          var Samples= data.samples;
          var ResArr= Samples.filter(samp=> samp.id == id);
          var result= ResArr[0]
      
          var OTUids = result.otu_ids;
          var OTU10LABELS = result.otu_labels;
          var values = result.sample_values;

          var PlotLayout = {
            xaxis:{title: "OTU ID"},
            height: 700,
            width: 1200
        };
            var DataBubble = [
            {
              x: OTUids,
              y: values,
              text: OTU10LABELS,
              mode: "markers",
              marker: {
                color: OTUids,
                size: values,
                }
            }
          ];
      
          Plotly.newPlot("bubble", DataBubble, PlotLayout);
    
          var DataBar =[
            {
              y:OTUids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
              x:values.slice(0,10).reverse(),
              text:OTU10LABELS.slice(0,10).reverse(),
              marker: {
                color: 'red'},
              type:"bar",
              orientation:"h",
            }
          ];
      
          var Layout_Bar = {
            title: "Top 10 OTU",
            margin: { t: 30, l: 150 },
            height: 800,
            width: 1200
          };
      
          Plotly.newPlot("bar", DataBar, Layout_Bar);
        });
      }  


    function DropdownModif(id) {
        ReadSamplesJSON(id);
        DemographicRep(id);
    }
    
    function StartGraphs() {
        var Drop = d3.select("#selDataset");
        d3.json("samples.json").then((d)=> {
            d.names.forEach(function(name) {
                Drop.append("option").text(name).property("value");
            });
            ReadSamplesJSON(d.names[0]);
            DemographicRep(d.names[0]);
        });
    }
    StartGraphs();