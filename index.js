const [width, height] = [500, 500];
const svg = d3.select('.canvas')
                .append('svg')
                .attr('width', width)
                .attr('height', height);


let simulation;
let radius = 16;

const ParentColors = {
        fill: '#E67C7A',
        stroke: '#E98B8B'
};

const nodeColors = [
    {
        fill: '#edcfa9',
        stroke: '#edcfb9'
    },
    {
        fill: '#e89f71',
        stroke: '#e89f51'
    },
    {
        fill: '#d57149',
        stroke: '#d57119'
    },
]

const hoverColros = {
    fill:'#9d65c9',
    stroke: '#d789d7'
}


function update(nodes, links, selectedNode){
    let charge = -100;
    let gravity = 90;
    if(selectedNode){
        charge = -500;
        gravity = 80;
    }

    const linkdistance = Math.min((width / 6), 100);

    console.log('linkdistance',linkdistance)

    simulation  = d3.forceSimulation(nodes)
                .force('charge', d3.forceManyBody().strength(charge)) // repel
                .force('link', d3.forceLink(links)
                    .id(d => d.id)
                    .distance((d) => {
                        //console.log('*** distance **',d);
                        if( parseInt(d.target.id) < 3 ){
                            return 150;
                        } else if( parseInt(d.target.id) <  6 ){
                            return 100;
                        }
                        else if( parseInt(d.target.id) <  9){
                            return 150;
                        }
                            else {
                            return 100;
                        }
                    }))
                .force('center', d3.forceCenter(width/2,height/2))
                .force("gravity", d3.forceManyBody().strength(gravity))
                // attract


    const link = svg.selectAll('path.link')
                .data(links)
                .enter()
                .append('path')
                .attr('stroke', '#ccc')
                .attr('stroke-width', 1)
                .attr('fill', 'none')
                .attr('class', 'linkclass');


    var node = svg.selectAll('circle')
                .data(nodes)
                .enter()
                .append("circle")
                .attr('r', d => {
                    if(selectedNode && selectedNode.id === d.id ){
                        return radius + 10;
                    }else{
                        return radius;
                    }
                })
                .attr('stroke-width', 1)
                .attr('stroke', d => {
                    if(selectedNode && selectedNode.id === d.id ){
                        return ParentColors.stroke;
                    }else{
                        const id = parseInt(d.id);
                        const color = nodeColors[id%(nodeColors.length)];
                        return color.stroke || 'red';
                    }
                })
                .attr('id', d => d.id)
                // .attr('class', 'normalNode')
                .attr('fill', d => {
                    if(selectedNode && selectedNode.id === d.id ){
                        return ParentColors.fill;
                    }else{
                        const id = parseInt(d.id);
                        const color = nodeColors[id%(nodeColors.length)];
                        return color.fill || 'orange';
                    }
                })


    node.on('mousedown', d => {
       const { children = {} } = d;
       if(children && children.nodes && children.nodes.length > 0){
        svg.selectAll("circle").remove();
        svg.selectAll("path").remove();
        const { nodes, links} = children;
        this.update(nodes, links, d);
       }
    });

    node.on('mouseenter', d => {
        console.log('*** node enter ***', d);
        document.getElementById(d.id).style.fill = hoverColros.fill;
        document.getElementById(d.id).style['stroke-width'] = 2;
        document.getElementById(d.id).style.stroke = hoverColros.stroke;

        d3.select('#d.id')
                .attr("r", 16)
                .transition()
                .duration(1000)
                .attr("r", 50);
     });

     node.on('mouseleave', d => {
        const sid = parseInt(d.id);
        const color = nodeColors[sid%(nodeColors.length)];
        document.getElementById(d.id).style.fill = color.fill;
        document.getElementById(d.id).style['stroke-width'] = 1;
        document.getElementById(d.id).style.stroke = color.stroke;
    });

    link.on('mouseenter', d => {
       console.log('*** link enter ***', d);
        document.getElementById(d.source.id).style.fill = hoverColros.fill;
        document.getElementById(d.source.id).style['stroke-width'] = 2;
        document.getElementById(d.source.id).style.stroke = hoverColros.stroke;

        document.getElementById(d.target.id).style.fill = hoverColros.fill;
        document.getElementById(d.target.id).style['stroke-width'] = 2;
        document.getElementById(d.target.id).style.stroke = hoverColros.stroke;
    });

    link.on('mouseleave', d => {
        const sid = parseInt(d.source.id);
        const color = nodeColors[sid%(nodeColors.length)];
        document.getElementById(d.source.id).style.fill = color.fill;
        document.getElementById(d.source.id).style['stroke-width'] = 1;
        document.getElementById(d.source.id).style.stroke = color.stroke;

         const tid = parseInt(d.target.id);
         const tcolor = nodeColors[tid%(nodeColors.length)];
        document.getElementById(d.target.id).style.fill = tcolor.fill;
        document.getElementById(d.target.id).style['stroke-width'] = 1;
        document.getElementById(d.target.id).style.stroke = tcolor.stroke;
    });

    const lineGenerator = d3.line();


    simulation.on('end', () => {
        console.log('>>>> end');
        d3.selectAll('circle').transition().style('color', 'red').duration(1000);
    })


    //******start****** */
    // Use a timeout to allow the rest of the page to load first.
//    d3.timeout(function() {
//    // loading.remove();

//     // See https://github.com/d3/d3-force/blob/master/README.md#simulation_tick
//     for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
//       simulation.tick();
//     }

//     link.attr('d', d =>  {
//         const mid = [
//           (d.source.x + d.target.x ) / 2,
//           (d.source.y + d.target.y )/ 2
//         ]
//          return lineGenerator([
//               [d.source.x, d.source.y],
//              // mid,
//               [d.target.x, d.target.y]
//             ])
//        });

//     node.attr("cx", (d) =>
//                 {

//                     const noOfRows = 4;
//                     if( selectedNode ){
//                         if( selectedNode && selectedNode.id === d.id){
//                             return d.x = width / 2;
//                         }
//                     }
//                     return d.x = Math.max(radius, Math.min(width - radius, d.x));
//                 })
//         .attr("cy", (d) =>
//                 {
//                     if( selectedNode && selectedNode.id === d.id){
//                         return d.y = height / 2;
//                     }
//                     return d.y = Math.max(radius, Math.min(height - radius, d.y));
//                 });
//   });

    /*********end******* */



    simulation.on('tick', () => {
        link.attr('d', d =>  {
            const mid = [
              (d.source.x + d.target.x ) / 2,
              (d.source.y + d.target.y )/ 2
            ]
             return lineGenerator([
                  [d.source.x, d.source.y],
                 // mid,
                  [d.target.x, d.target.y]
                ])
           });

        node.attr("cx", (d) =>
                    {

                        const noOfRows = 4;
                        if( selectedNode ){
                            if( selectedNode && selectedNode.id === d.id){
                                return d.x = width / 2;
                            }
                        }
                        return d.x = Math.max(radius, Math.min(width - radius, d.x));
                    })
            .attr("cy", (d) =>
                    {
                        if( selectedNode && selectedNode.id === d.id){
                            return d.y = height / 2;
                        }
                        return d.y = Math.max(radius, Math.min(height - radius, d.y));
                    });

        // textContainer.attr('transform',d => `translate(${d.x + radius + 5}, ${d.y + radius -5})` );
    })

}


console.log('>>>svg', svg);

d3.json('./data2.json').then(data => {
    console.log('>>>', data);
    this.update(data.nodes, data.links);
})