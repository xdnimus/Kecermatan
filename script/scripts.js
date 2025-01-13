function back() {
  window.location.href = "start.html";
}

let hurufAwal = [];
let hurufAcak;
let jawabanBenar;
let nilai = 0;

function acakKotak() {
  const huruf = [...hurufAwal];

  if (huruf.length < 5) {
    console.error(
      "Jumlah huruf kurang dari 5. Pastikan elemen dengan ID var1-var5 ada."
    );
    return;
  }

  hurufAcak = [...huruf].sort(() => Math.random() - 0.5);

  const indexHilang = Math.floor(Math.random() * 4);
  jawabanBenar = hurufAcak.splice(indexHilang, 1)[0];

  for (let i = 1; i <= 4; i++) {
    const kotak = document.getElementById(`ktk${i}`);
    if (kotak) {
      kotak.textContent = hurufAcak[i - 1];
    } else {
      console.error(`Elemen dengan ID ktk${i} tidak ditemukan.`);
    }
  }
}

function pilgan(jawaban) {
  const pesan = document.getElementById("pesan");

  if (jawaban === undefined) {
    console.error("Argumen jawaban tidak diberikan ke fungsi pilgan.");
    pesan.textContent = "Terjadi kesalahan. Silakan coba lagi.";
    pesan.style.color = "orange";
    return;
  }

  jawaban = jawaban.toUpperCase();
  const jawabanBenarTampilan = jawabanBenar;

  console.log("Jawaban yang dipilih:", jawaban); // Debugging
  console.log("Jawaban yang benar:", jawabanBenar); // Debugging

  if (jawaban === jawabanBenar) {
    nilai += 10;
    pesan.textContent = "Jawaban Benar!";
    pesan.style.color = "green";
  } else {
    pesan.textContent =
      "Jawaban Salah! Jawaban yang benar adalah: " + jawabanBenarTampilan;
    pesan.style.color = "red";
  }
  updateNilai();
  acakKotak();
}

function updateNilai() {
  const nilaiElement = document.getElementById("nilai");
  if (nilaiElement) {
    nilaiElement.textContent = "Nilai: " + nilai;
  } else {
    console.error("Elemen dengan ID 'nilai' tidak ditemukan.");
  }
}

window.onload = function () {
  for (let i = 1; i <= 5; i++) {
    const elemen = document.getElementById(`var${i}`);
    if (elemen) {
      hurufAwal.push(elemen.textContent.toUpperCase());
    } else {
      console.error(`Elemen dengan ID var${i} tidak ditemukan.`);
    }
  }
  console.log("Isi hurufAwal:", hurufAwal);
  acakKotak();

  let pesanElement = document.createElement("p");
  pesanElement.id = "pesan";
  pesanElement.style.fontWeight = "bold";
  pesanElement.style.textAlign = "center";
  document.body.appendChild(pesanElement);

  let nilaiElement = document.createElement("h2");
  nilaiElement.id = "nilai";
  nilaiElement.textContent = "Nilai: " + nilai;
  nilaiElement.style.textAlign = "center";
  document.body.appendChild(nilaiElement);
  updateNilai();
};
