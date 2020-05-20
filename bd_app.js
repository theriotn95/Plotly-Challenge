function getChart(id) {
    d3.json("samples.json").then((data)=> {
        var freq = data.metadata.map(d => d.freq)
       
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
        var otu_top = (samples.otu_ids.slice(0, 10)).reverse();
        
        var otu_id = otu_top.map(d => "OTU " + d)
  
        var labels = samples.otu_labels.slice(0, 10);
  
        
        var trace1 = {
            x: samplevalues,
            y: otu_id,
            text: labels,
            type:"bar",
            orientation: "h",
        };
        


