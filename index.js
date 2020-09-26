const [width, height] = [500, 500];
const svg = d3.select('.canvas')
                .append('svg')
                .attr('width', width)
                .attr('height', height);

let simulation;

function update(nodes, links, selectedNode){
   // const k = Math.sqrt(nodes.length / (width * height));
    let charge = -100;
    let gravity = 90;
    if(selectedNode){
        charge = -200;
        gravity = 80;
    }
    simulation  = d3.forceSimulation(nodes)
                .force('charge', d3.forceManyBody().strength(charge))
                .force('link', d3.forceLink(links)
                    .id(d => d.id)
                    .distance(80))
                .force('center', d3.forceCenter(width/2,height/2))
                .force("gravity", d3.forceManyBody().strength(gravity))


    const link = svg.selectAll('path.link')
                .data(links)
                .enter()
                .append('path')
                .attr('stroke', '#ccc')
                .attr('stroke-width', 1)
                .attr('fill', 'none');

    var node = svg.selectAll('circle')
                .data(nodes)
                .enter()
                .append("circle")
                .attr('r', 16)
                .attr('stroke-width', 1)
                .attr('stroke', 'red')
                .style('fill', d => {
                     if( selectedNode && selectedNode.id && d.id === selectedNode.id ){
                         return 'pink';
                     }
                     return 'orange'
                });

    node.on('mousedown', d => {
       const { children = {} } = d;
       if(children && children.nodes && children.nodes.length > 0){
        svg.selectAll("circle").remove();//add this to remove the links
        svg.selectAll("path.link").remove();
        const { nodes, links} = children;
        this.update(nodes, links, d);
       }

    })

    const lineGenerator = d3.line();

    simulation.on('tick', () => {
        link.attr('d', d =>  {
            const mid = [
              (d.source.x + d.target.x ) / 2,
              (d.source.y + d.target.y )/ 2
            ]
             return lineGenerator([
                  [d.source.x, d.source.y],
                  mid,
                  [d.target.x, d.target.y]
                ])
           });


        node.attr('cx' , d => {
            console.log('>>> d',d);
            return d.x;
        })
         .attr('cy', d => {
             console.log('>>> d.y');
             return d.y;
         });
    })

}


console.log('>>>svg', svg);

d3.json('./data1.json').then(data => {
    console.log('>>>', data);
    this.update(data.nodes, data.links);
})