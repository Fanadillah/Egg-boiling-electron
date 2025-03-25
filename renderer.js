// Event listener untuk tombol preset
document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.getAttribute('data-type');
    const time = btn.getAttribute('data-time');
    // Navigasi ke halaman timer dengan parameter type dan time
    window.location.href = `timer.html?type=${type}&time=${time}`;
  });
});

// Custom window controls menggunakan preload API
document.getElementById('minimize-btn').addEventListener('click', () => {
  window.electronAPI.sendWindowControl('minimize');
});
document.getElementById('maximize-btn').addEventListener('click', () => {
  window.electronAPI.sendWindowControl('maximize');
});
document.getElementById('close-btn').addEventListener('click', () => {
  window.electronAPI.sendWindowControl('close');
});
