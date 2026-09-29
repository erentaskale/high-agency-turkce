// site.js: sayfanın davranışları. Tema düğmesi, içindekiler menüsü, okuma çubuğu.

const kok = document.documentElement;
const masaustu = matchMedia("(min-width: 901px)");
const sistemKaranlik = matchMedia("(prefers-color-scheme: dark)");

// Tarayıcı depolamaya izin vermezse (gizli sekme vb.) site yine çalışsın
function kaydet(anahtar, deger) {
  try {
    if (deger) localStorage.setItem(anahtar, deger);
    else localStorage.removeItem(anahtar);
  } catch (e) {}
}

// ===== 1) Tema =====
// Kullanıcı hiç seçmediyse cihazın temasına uyulur (bunu CSS hallediyor)
const temaDugmesi = document.getElementById("tema-dugmesi");

function karanlikMi() {
  if (kok.dataset.tema) return kok.dataset.tema === "karanlik";
  return sistemKaranlik.matches;
}

temaDugmesi.addEventListener("click", () => {
  const yeni = karanlikMi() ? "acik" : "karanlik";
  kok.dataset.tema = yeni;
  kaydet("tema", yeni);
});

// ===== 2) İçindekiler menüsü =====
// Masaüstünde: yan menüyü aç/kapat (tercih hatırlanır)
// Telefonda:   üst bardan aşağı açılan listeyi aç/kapat
const menuDugmesi = document.getElementById("menu-dugmesi");
const menu = document.getElementById("icindekiler");

function menuAcikMi() {
  return masaustu.matches ? kok.dataset.menu !== "kapali" : document.body.classList.contains("menu-acik");
}

function ariaGuncelle() {
  menuDugmesi.setAttribute("aria-expanded", String(menuAcikMi()));
}

menuDugmesi.addEventListener("click", () => {
  if (masaustu.matches) {
    if (menuAcikMi()) kok.dataset.menu = "kapali";
    else delete kok.dataset.menu;
    kaydet("menu", kok.dataset.menu);
  } else {
    document.body.classList.toggle("menu-acik");
  }
  ariaGuncelle();
});

// Telefonda bir başlık seçilince liste kapansın
menu.addEventListener("click", (olay) => {
  if (olay.target.closest("a") && !masaustu.matches) {
    document.body.classList.remove("menu-acik");
    ariaGuncelle();
  }
});

document.addEventListener("keydown", (olay) => {
  if (olay.key === "Escape" && document.body.classList.contains("menu-acik")) {
    document.body.classList.remove("menu-acik");
    ariaGuncelle();
  }
});

// Pencere telefon <-> masaüstü boyutu arasında değişirse durumu toparla
masaustu.addEventListener("change", () => {
  document.body.classList.remove("menu-acik");
  ariaGuncelle();
});
ariaGuncelle();

// ===== 3) Okuma çubuğu ve okunan başlık =====
const cubuk = document.querySelector(".ilerleme span");
const basliklar = [...document.querySelectorAll("article h2[id], article h3[id]")];
const linkler = new Map([...menu.querySelectorAll("a")].map((a) => [a.hash.slice(1), a]));
let aktifLink = null;
let bekliyor = false;

function guncelle() {
  bekliyor = false;

  // Çubuk: kaydırılan mesafe / kaydırılabilecek toplam mesafe
  const toplam = kok.scrollHeight - innerHeight;
  const oran = toplam > 0 ? scrollY / toplam : 0;
  cubuk.style.transform = `scaleX(${Math.min(1, oran)})`;

  // Okunan başlık: ekranın üst kısmını geçmiş son başlık
  let okunan = null;
  for (const b of basliklar) {
    if (b.getBoundingClientRect().top < innerHeight * 0.25) okunan = b;
    else break;
  }
  const yeniLink = okunan ? linkler.get(okunan.id) : null;
  if (yeniLink !== aktifLink) {
    aktifLink?.classList.remove("aktif");
    yeniLink?.classList.add("aktif");
    aktifLink = yeniLink;
  }
}

// Kaydırma olayı saniyede onlarca kez gelir, hesabı her karede en fazla bir kez yap
function zamanla() {
  if (!bekliyor) {
    bekliyor = true;
    requestAnimationFrame(guncelle);
  }
}

addEventListener("scroll", zamanla, { passive: true });
addEventListener("resize", zamanla);
guncelle();
