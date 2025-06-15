const clientId = '823d343e0730494eb14d14deef12ec55';
const redirectUri = 'https://fedittt0.github.io/spotify-map/';
const scopes = 'user-top-read';

document.getElementById('login-btn').addEventListener('click', () => {
  // ¡¡¡AQUÍ ESTÁ EL CAMBIO IMPORTANTE!!!
  window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes}&show_dialog=true`;
});

// Obtener el token
const hash = window.location.hash.substring(1).split('&').reduce((acc, item) => {
  if (item) {
    const [key, value] = item.split('=');
    acc[key] = decodeURIComponent(value);
  }
  return acc;
}, {});

window.accessToken = hash.access_token;