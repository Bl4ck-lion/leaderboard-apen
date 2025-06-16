// Ambil elemen-elemen penting
const subjectSelect = document.getElementById('subject');
const searchInput = document.getElementById('search');
const podium = document.getElementById('podium');
const othersList = document.getElementById('othersList');
const themeToggle = document.getElementById('themeToggle');

// Set data awal
let currentSubject = 'Matematika';
let currentData = [...data[currentSubject]];

// Render leaderboard
function render() {
  let filtered = currentData.slice().sort((a, b) => b.score - a.score);
  const searchTerm = searchInput.value.toLowerCase();

  if (searchTerm) {
    filtered = filtered.filter(item => item.nama.toLowerCase().includes(searchTerm));
  }

  const [first, second, third, ...rest] = filtered;

  podium.innerHTML = '';
  othersList.innerHTML = '';

  const podiumHTML = (player, rank) => `
    <div class="podium-item ${rank}">
      <div class="avatar-container">
        <img src="${player.avatar}" alt="${player.nama}" />
      </div>
      <div class="name">${player.nama}</div>
      <div class="score">${player.score}</div>
    </div>`;

  if (first) podium.innerHTML += podiumHTML(first, 'gold');
  if (second) podium.innerHTML += podiumHTML(second, 'silver');
  if (third) podium.innerHTML += podiumHTML(third, 'bronze');

  rest.forEach((item, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${i + 4}. ${item.nama}</span><span>${item.score}</span>`;
    othersList.appendChild(li);
  });
}

// Event listener ketika mapel berubah
subjectSelect.addEventListener('change', () => {
  currentSubject = subjectSelect.value;
  currentData = [...data[currentSubject]];
  render();
});

// Event listener ketika melakukan pencarian
searchInput.addEventListener('input', render);

// Dark mode toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Jalankan render awal saat halaman load
render();
