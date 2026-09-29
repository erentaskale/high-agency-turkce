// build.js: ceviri/ klasöründeki Markdown ve görsel listesini şablonla
// birleştirip index.html üretir.  Çalıştırmak için:  node build.js

const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const KOK = __dirname;
const PARTS_KLASORU = path.join(KOK, "ceviri", "parts");

// 1) Girdileri oku
const sablon = fs.readFileSync(path.join(KOK, "sablon.html"), "utf8");
const liste = JSON.parse(fs.readFileSync(path.join(KOK, "ceviri", "gorseller.json"), "utf8"));

const gorseller = new Map(liste.gorseller.map((g) => [g.no, g]));
const videolar = new Map(liste.videolar.map((v) => [v.no, v]));

// Partlar dosya adındaki numaraya göre sıralanır: 01, 02, ... 06
const partDosyalari = fs
  .readdirSync(PARTS_KLASORU)
  .filter((ad) => ad.endsWith(".tr.md"))
  .sort();

// 2) Markdown -> HTML
let icerik = partDosyalari
  .map((ad) => marked.parse(fs.readFileSync(path.join(PARTS_KLASORU, ad), "utf8")))
  .join("\n");

// 3) İşaretleri gerçek görsel ve videolarla değiştir
const kullanilanGorseller = new Set();

icerik = icerik.replace(/<!-- GORSEL (\d+) -->/g, (_, no) => {
  const g = gorseller.get(no);
  if (!g) throw new Error(`Metinde GORSEL ${no} var ama gorseller.json'da yok`);
  kullanilanGorseller.add(no);
  const alt = g.dekoratif ? "" : kacis(g.alt);
  return `<figure><img src="ceviri/${g.dosya}" width="${g.genislik}" height="${g.yukseklik}" alt="${alt}" loading="lazy"></figure>`;
});

icerik = icerik.replace(/<!-- VIDEO (V\d+):[^>]*-->/g, (_, no) => {
  const v = videolar.get(no);
  if (!v) throw new Error(`Metinde VIDEO ${no} var ama gorseller.json'da yok`);
  return `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${v.youtube_id}" title="YouTube videosu" loading="lazy" allowfullscreen></iframe></div>`;
});

// 4) Başlıklara id ver ki içindekiler menüsü onlara link verebilsin
const kullanilanIdler = new Set();

icerik = icerik.replace(/<h([23])>(.*?)<\/h\1>/g, (_, seviye, ic) => {
  const temel = slug(ic.replace(/<[^>]+>/g, ""));
  let id = temel;
  for (let i = 2; kullanilanIdler.has(id); i++) id = `${temel}-${i}`;
  kullanilanIdler.add(id);
  return `<h${seviye} id="${id}">${ic}</h${seviye}>`;
});

// 5) Şablona yerleştir ve yaz
const cikti = sablon.replace("{{ICERIK}}", icerik);
fs.writeFileSync(path.join(KOK, "index.html"), cikti);

// 6) Kısa rapor
const kullanilmayan = [...gorseller.keys()].filter((no) => !kullanilanGorseller.has(no));
console.log(`index.html üretildi: ${partDosyalari.length} part, ${kullanilanGorseller.size} görsel`);
if (kullanilmayan.length) console.warn(`Uyarı: metinde yeri olmayan görseller: ${kullanilmayan.join(", ")}`);

// --- Yardımcılar ---

// "Bir Soruda High Agency" -> "bir-soruda-high-agency"
function slug(metin) {
  const harita = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" };
  return metin
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşü]/g, (h) => harita[h])
    .replace(/&[a-z#0-9]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Alt metindeki tırnak gibi karakterler HTML'i bozmasın
function kacis(metin) {
  return metin.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
