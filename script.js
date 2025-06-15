if (window.accessToken) {
  fetch('https://api.spotify.com/v1/me/top/artists?limit=50', {
    headers: {
      Authorization: 'Bearer ' + window.accessToken
    }
  })
    .then(response => response.json())
    .then(data => {
      const genreMap = {};

      data.items.forEach(artist => {
        artist.genres.forEach(genre => {
          if (!genreMap[genre]) genreMap[genre] = [];
          genreMap[genre].push(artist.name);
        });
      });

      console.log('Mapa de géneros:', genreMap);
      drawBubbles(genreMap);
    });
}
