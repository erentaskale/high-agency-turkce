# İnisiyatifin Gücü: Tasarım Belgesi

George Mack'in "High Agency in 30 Minutes" denemesinin Türkçe versiyonu. Tek sayfalık bir okuma sitesi.

> Kural: Tasarım değişecekse önce bu belge güncellenir, sonra kod.

## Kararlar

### İçerik
- **Site adı:** İnisiyatifin Gücü
- **Giriş alanı:** **HIGH AGENCY** ve altında *"O bir yolunu bulur" dediğin insan olmak.* (cilalanacak)
- **İzin:** George Mack çeviriyi yayınlamaya izin verdi (30 Eylül 2026, e-postayla)
- **Kaynak notu:** En üstte yazarın adı, orijinal sitenin linki ve "bu bir çeviridir" notu
- **Görseller (MVP):** Orijinal haliyle kalacak, üzerlerindeki yazılar v2'de çevrilecek

### Sayfa yapısı: orijinale sadık (A düzeni)

```
━━━━━━━━━━━━━━░░░░░░░░░░░░░░░░░░░  ← okuma ilerleme çubuğu
┌──────────────────────────────────────────┐
│ İnisiyatifin Gücü                     🌙  │
├──────────┬───────────────────────────────┤
│ İÇİNDE-  │        HIGH AGENCY            │
│ KİLER  ◀ │  "O bir yolunu bulur"...      │
│          │  George Mack · Çeviri notu    │
│ • Giriş  │                               │
│ • ...    │  Metin...                     │
│ (sabit)  │  [   görsel   ]               │
└──────────┴───────────────────────────────┘
```

- **İçindekiler:** Solda sabit durur. Üst bardaki ☰ düğmesiyle açılıp kapanır (telefondaki düğmenin aynısı, her ekranda aynı yerde). Okunan bölümün başlığı vurgu renginde görünür
- **Okuma ilerleme çubuğu:** En üstte, tema renginde, sayfa kaydırıldıkça dolar
- **Karanlık mod:** Düğmesi sağ üstte. Site ilk açılışta cihazın temasına uyar

### Telefonda
Yan menü yok. Metin tek sütun halinde düz akar.

```
━━━━━━░░░░░░░░░░░░░░
┌──────────────────┐
│ İnisiyatifin G. ☰ 🌙│
├──────────────────┤
│ Metin akar...    │
```

- Üst bar sabit durur, okuma çubuğu barın üstündedir
- ☰ düğmesine basınca başlık listesi üst bardan aşağı doğru açılır. Bir başlık seçilince liste kapanır ve sayfa o başlığa kayar

### Animasyon ilkesi
Okura yardım eden animasyon evet, gösteriş için olan hayır. İçindekilerden bir başlığa tıklayınca sayfa yumuşakça kayar, tema değişirken renkler yumuşak geçer.

### Renk: Zümrüt yeşili
Vurgu rengi okuma çubuğunda, linklerde ve seçili başlıkta kullanılır. Her mod kendi tonunu kullanır, çünkü aynı ton iki arka planda da iyi okunmaz (kontrast).

| | Aydınlık | Karanlık |
|---|---|---|
| Arka plan | `#ffffff` | `#141614` |
| Metin | `#1a1a1a` | `#e4e6e3` |
| İkincil metin | `#555555` | `#9aa09a` |
| Vurgu (zümrüt) | `#047857` | `#34d399` |

### Tipografi ve boşluk
- **Başlıklar:** Poppins (orijinal siteye selam)
- **Metin:** Source Serif 4 (uzun okumada göze rahat gelir)
- İki font da Google Fonts'tan alınıyor ve Türkçe karakterleri destekliyor
- Metin boyutu 20px, satır aralığı ~1.6, metin sütunu ~70 karakter genişliğinde
- Boşluk ölçeği: 4 / 8 / 16 / 32 / 64 px

### Teknoloji: saf HTML + CSS + JS
Veritabanı ve sunucu gerekmiyor, sitenin tek sayfası olduğu için içerik tekrarı sorunu da yok. MERN, gerçekten ihtiyaç duyulacak blog projesinde kullanılacak. Yayın yeri GitHub Pages.

### Mimari: önceden çevir (build)
Okur siteye girdiğinde yazı hazır olmalı, sonradan yüklenmemeli. Bu yüzden Markdown sayfaya dönüştürme işi okurun tarayıcısında değil, bizim bilgisayarımızda bir kere yapılır. Orijinal site (Webflow) de aynı mantıkla çalışıyor.

```
ceviri/parts/*.tr.md ─┐
ceviri/gorseller.json ├─► node build.js ─► index.html
sablon.html ──────────┘
```

| Dosya | Görevi |
|---|---|
| `ceviri/` | İçerik kaynağı. Metin **sadece burada** düzenlenir |
| `sablon.html` | Sayfa iskeleti. Üst bar, giriş, içindekiler ve metnin geleceği yer |
| `stil.css` | Görünüm |
| `site.js` | Davranış: tema, okuma çubuğu, içindekiler menüsü |
| `build.js` | Markdown + JSON + şablonu birleştirip `index.html` üretir |
| `index.html` | **Üretilen dosya, elle düzenlenmez.** GitHub Pages bunu yayınlar |

Metin değişince: `.md` dosyasını düzelt → `node build.js` → commit.

- **Adres:** erentaskale.github.io/high-agency-turkce (başlık yine "İnisiyatifin Gücü")

## v2'ye kalanlar
- Görsellerdeki yazıların çevrilmesi
- Kitap bölümü tarzı başlıklar (D düzeni), dergi tarzı içindekiler kartları (E düzeni)
