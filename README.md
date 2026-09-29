# İnisiyatifin Gücü: High Agency Türkçe

> Bu sayfa, George Mack'in [High Agency in 30 Minutes](https://www.highagency.com) yazısının, kar amacı gütmeyen Türkçe çevirisidir.

**🔗 Siteyi oku: [erentaskale.github.io/high-agency-turkce](https://erentaskale.github.io/high-agency-turkce/)**

---

## Neden?

*High agency*, George Mack'in "21. yüzyılın belki de en önemli fikri" dediği bir kavram. Hayatın başına gelmesini beklemeyen, "olmaz" denince "peki nasıl olur?" diye düşünmeye başlayan insanın özelliği.

Orijinal yazı İngilizce ve Türkçede bu kavram neredeyse hiç bilinmiyor. Bu proje, yazıyı Türk okurlara aslına sadık ve akıcı bir dille ulaştırmak için yapıldı.

## İyi niyet notu

- Çeviri, **yazar George Mack'in izniyle** yayınlanmıştır.
- Site **kar amacı gütmez**: reklam yok, ücret yok, takip yok.
- Yazının ve fikirlerin tüm hakları yazarına aittir. Orijinal yazıyı okumak için: [highagency.com](https://www.highagency.com)
- Yazıdaki görseller orijinal yazıdan alınmıştır. Görsellerin üzerindeki İngilizce yazılar ilerleyen sürümde çevrilecek.

Bir hata, eksik ya da hak sahibi olarak bir talebin varsa lütfen [issue aç](https://github.com/erentaskale/high-agency-turkce/issues).

## Özellikler

- 🌙 Karanlık / aydınlık tema (cihazın ayarına uyar, seçimin hatırlanır)
- 📑 Açılıp kapanabilen içindekiler menüsü, okuduğun bölüm vurgulanır
- 📏 Sayfanın üstünde okuma ilerleme çubuğu
- 📱 Telefonda sade, tek sütun okuma
- ⚡ Yazı sayfayla birlikte hazır gelir, sonradan yüklenmez

## Nasıl yapıldı?

Saf **HTML + CSS + JavaScript**. Veritabanı ya da sunucu yok, yayın yeri **GitHub Pages**.

Çeviri Markdown dosyalarında duruyor. Küçük bir Node scripti bu dosyaları şablonla birleştirip tek bir `index.html` üretiyor:

```
ceviri/parts/*.tr.md ─┐
ceviri/gorseller.json ├─► node build.js ─► index.html
sablon.html ──────────┘
```

| Dosya / klasör | Görevi |
|---|---|
| `ceviri/` | Çeviri metni (6 part), görseller ve görsel listesi |
| `sablon.html` | Sayfa iskeleti |
| `stil.css` | Görünüm: renkler, fontlar, düzen |
| `site.js` | Davranış: tema, menü, okuma çubuğu |
| `build.js` | Markdown'ı HTML'e çevirip `index.html` üretir |
| `tasarim.md` | Tasarım kararları ve gerekçeleri |

### Yerelde çalıştırmak

```bash
npm install
node build.js
```

Sonra `index.html`'i tarayıcıda aç. Metni değiştirmek için `ceviri/parts/` içindeki `.md` dosyasını düzenleyip `node build.js`'i tekrar çalıştırman yeterli. `index.html` elle düzenlenmez.

## Teşekkür

Yazıyı yazdığı ve Türkçeye çevrilmesine izin verdiği için **[George Mack](https://x.com/george__mack)**'e.

---

Çeviri ve site: [Eren](https://github.com/erentaskale)
