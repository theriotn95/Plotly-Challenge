function buildDash(sample) {
    d3.json("samples.json").then((data) => {
      
      var metadata = data.metadata;
      
      var sampleFilter = metadata.filter(sample_obj => sample_obj.id == sample);
      var s_results = sampleFilter[0];
      
      var panel = d3.select("#sample-metadata");
  
      panel.html("");
  
      Object.entries(s_results).forEach(([key, value]) => {
        panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
}

function buildPlots(sample) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      // Create a filter for selected sample
      var sampleFilter = samples.filter(sample_obj => sample_obj.id == sample);
      var s_results = sampleFilter[0];
  
      var otu_ids = s_results.otu_ids;
      var otu_labels = s_results.otu_labels;
      var sample_values = s_results.sample_values;
  
      // Build the bubble chart
      var bub_layout = {
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 25}
      };
      var bubble_data = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }
      ];
  
      Plotly.newPlot("bubble", bubble_data, bub_layout);
  
      var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var bar_plot = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
  
      var bar_layout = {
        margin: { t: 25, l: 175 }
      };
  
      Plotly.newPlot("bar", bar_plot, bar_layout);
    });
  }

  function init() {
    var selector = d3.select("#selDataset");
  
    //
    d3.json("samples.json").then((data) => {
      var subj_ids = data.names;
  
      subj_ids.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      var starter_samp = subj_ids[0];
      buildPlots(starter_samp);
      buildDash(starter_samp);
    });
  }
  
  function optionChanged(new_subj) {
    
    buildPlots(new_subj);
    buildDash(new_subj);
  }
  
 
  init();
  