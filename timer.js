// Fungsi untuk membaca parameter query dari URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      type: params.get('type'),
      time: parseInt(params.get('time'), 10)
    };
  }
  
  const params = getQueryParams();
  const timerDuration = params.time || 0;
  let remainingTime = timerDuration;
  let timerInterval;
  
  // Fungsi untuk meng-update tampilan timer
  function updateDisplay(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
  }
  
  // Fungsi untuk menjalankan timer
  function startTimer(duration) {
    clearInterval(timerInterval);
    remainingTime = duration;
    updateDisplay(remainingTime);
    timerInterval = setInterval(() => {
      remainingTime--;
      if (remainingTime < 0) {
        clearInterval(timerInterval);
        alert("Waktunya habis!");
        updateDisplay(0);
      } else {
        updateDisplay(remainingTime);
      }
    }, 1000);
  }
  
  // Set gambar berdasarkan jenis telur
  const eggImageDiv = document.getElementById('egg-image');
  const eggType = params.type || 'soft';
  let imageSrc = '';
  if (eggType === 'soft') {
    imageSrc = 'images/egg_soft.png'; // Gambar telur setengah matang
  } else if (eggType === 'medium') {
    imageSrc = 'images/egg_medium.png'; // Gambar telur medium
  } else if (eggType === 'hard') {
    imageSrc = 'images/egg_hard.png'; // Gambar telur matang
  }
  const imgElement = document.createElement('img');
  imgElement.src = imageSrc;
  imgElement.alt = `${eggType} boiled egg`;
  eggImageDiv.appendChild(imgElement);
  
  // Mulai timer dengan durasi yang ditentukan
  startTimer(timerDuration);
  
  // Event listener untuk tombol batal (kembali ke halaman pemilihan)
  document.getElementById('cancel-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
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
  