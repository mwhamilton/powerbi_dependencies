const TEST = {
  "id": "Eve",
    "children": [
    {
      "id": "Cain"
    },
    {
      "id": "Seth",
      "children": [
      {
        "id": "Enos"
      },
      {
        "id": "Noam"
      }
      ]
    },
    {
      "id": "Abel"
    },
    {
      "id": "Awan",
      "children": [
      {
        "id": "Enoch"
      }
      ]
    },
    {
      "id": "Azura"
    }
  ]
};
new Vue({
  el: '#page',
  data: function(){
    return {
      calcColSources: [],
      measureSources: [],
      tableSources: [],
      visualSources: [],
    };
  },
  mounted: function(){
    this.getData();
  },
  methods: {
    getData: function(){
      axios.post('/api/dependencies').then(function(response){
        this.calcColSources = response.data.calc_col_sources;
        this.measureSources = response.data.measure_sources;
        this.tableSources = response.data.table_sources;
        this.visualSources = response.data.visual_sources;
        this.genDAG();
      }.bind(this));
    },
    genDAG: function(){
      const nodes = Array.from(new Set([
        this.calcColSources.map(x => x.name),
        this.measureSources.map(x => x.name),
        this.tableSources.map(x => x.name),
        //this.visualSources.map(x => x.name), excluded for the time being
      ].flat())).map(function(x){
        return {
          id: x,
        };
      });
      const links = []
      var myGraph = ForceGraph();
      myGraph(document.getElementById("graph")).graphData({nodes: nodes, links: links}).nodeCanvasObject((node, ctx, globalScale) => {
        const label = node.id;
        ctx.fillText(label, node.x, node.y);
      })
    }
  }
})