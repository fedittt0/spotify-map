function drawBubbles(genreMap) {
  const nodes = [];
  const links = [];

  // Crear nodos y links
  Object.entries(genreMap).forEach(([genre, artists]) => {
    nodes.push({ id: genre, group: 'genre' });

    artists.forEach(artist => {
      nodes.push({ id: artist, group: 'artist' });
      links.push({ source: genre, target: artist });
    });
  });

  const width = window.innerWidth;
  const height = window.innerHeight * 0.8;

  const svg = d3.select('#graph').append('svg')
    .attr('width', width)
    .attr('height', height);

  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(100))
    .force('charge', d3.forceManyBody().strength(-100))
    .force('center', d3.forceCenter(width / 2, height / 2));

  const link = svg.append('g')
    .selectAll('line')
    .data(links)
    .enter().append('line')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6);

  const node = svg.append('g')
    .selectAll('circle')
    .data(nodes)
    .enter().append('circle')
    .attr('r', d => d.group === 'genre' ? 20 : 10)
    .attr('fill', d => d.group === 'genre' ? '#1DB954' : '#ffffff')
    .call(drag(simulation));

  const label = svg.append('g')
    .selectAll('text')
    .data(nodes)
    .enter().append('text')
    .text(d => d.id)
    .attr('font-size', '12px')
    .attr('fill', '#fff');

  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    label
      .attr('x', d => d.x + 5)
      .attr('y', d => d.y + 5);
  });

  function drag(simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }
}
