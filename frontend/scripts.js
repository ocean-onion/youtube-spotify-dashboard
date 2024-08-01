document.getElementById('download-mp4').addEventListener('click', () => {
  const url = document.getElementById('youtube-url').value;
  fetch('/api/youtube/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url, format: 'mp4' })
  })
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'video.mp4';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(error => console.error('Error:', error));
});

document.getElementById('download-mp3').addEventListener('click', () => {
  const url = document.getElementById('youtube-url').value;
  fetch('/api/youtube/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url, format: 'mp3' })
  })
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'audio.mp3';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(error => console.error('Error:', error));
});

// Fetch and display Spotify stats
fetch('/api/spotify/stats')
  .then(response => response.json())
  .then(data => {
    const statsContainer = document.getElementById('spotify-stats');
    statsContainer.innerHTML = '';
    data.items.forEach(track => {
      const trackElement = document.createElement('div');
      trackElement.textContent = `${track.name} by ${track.artists.map(artist => artist.name).join(', ')}`;
      statsContainer.appendChild(trackElement);
    });
  })
  .catch(error => console.error('Error:', error));
