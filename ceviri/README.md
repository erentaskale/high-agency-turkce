# ceviri/ klasörü: site için kullanım kılavuzu

George Mack'in "High Agency in 30 Minutes" yazısının Türkçe çevirisi. Bu klasör site kodu için **içerik kaynağıdır**. Site oturumu buradan okur, çeviri oturumu buraya yazar.

## Neler var?

| Yol | Ne | Site kodu için |
|---|---|---|
| `parts/NN-ad.tr.md` | Türkçe metin, 6 part (sırayla 01 → 06) | **Bunu kullan.** Sırayla birleştir. |
| `parts/NN-ad.en.md` | İngilizce orijinal | Sadece referans, sitede kullanılmaz |
| `gorseller/` | 70 görsel (`NN-kisa-ad.avif/.jpg/.gif`) | Sitenin görsel klasörüne kopyala |
| `gorseller.json` | Görsellerin ve videoların makine listesi | Kod bunu okur |
| `gorseller.md` | Aynı listenin insan için okunur hali | Eren için |
| `sozluk.md` | Çeviri kararları | Site kodu için gerekmez |

## Metindeki işaretler

Markdown dosyalarında iki tür HTML yorumu var. Markdown render edilince görünmezler, bu yüzden kodun bunları kendisinin değiştirmesi gerekir:

```
<!-- GORSEL 04 -->
<!-- VIDEO V3: https://www.youtube.com/watch?v=szzVlQ653as -->
```

- `GORSEL NN` → `gorseller.json` içinde `no: "NN"` olan kayda bak, oraya `<img>` koy.
- `VIDEO Vn: url` → `videolar` içinde `no: "Vn"` olan kayda bak, oraya YouTube embed koy.

## gorseller.json yapısı

```json
{
  "gorseller": [
    {
      "no": "04",
      "dosya": "gorseller/04-selam-vermeyen-adam.avif",
      "part": "01-giris",
      "genislik": 964, "yukseklik": 624,
      "alt": "Türkçe alt metin…",
      "dekoratif": false,
      "uzerinde_yazi": null,
      "orijinal_url": "https://www.highagency.com/_assets/…"
    }
  ],
  "videolar": [
    { "no": "V1", "part": "04-tuzaklar", "konum": "…", "youtube_id": "NqVoOC2azZI", "url": "…" }
  ]
}
```

Örnek `<img>` çıktısı:

```html
<img src="gorseller/04-selam-vermeyen-adam.avif" width="964" height="624"
     alt="Türkçe alt metin…" loading="lazy">
```

- `genislik` / `yukseklik`: `width`/`height` olarak ver. Sayfa yüklenirken içerik zıplamaz (layout shift).
- `dekoratif: true` → 5 tane ince ayırıcı çizgi (11, 28, 45, 64, 68). `alt=""` kullan. İstersen görsel yerine CSS `<hr>` da olur.
- `uzerinde_yazi` → v2 notu: görselin üstünde çevrilmemiş İngilizce yazı var. MVP'de görseller orijinal haliyle kullanılır.
- Format: çoğu **AVIF**, güncel tüm tarayıcılar destekliyor. Birkaçı JPG, biri GIF.

## Dikkat

- **Telif:** Görsellerin bir kısmı George Mack'e değil başkalarına ait (meme'ler, tarihi fotoğraflar). George'un cevabı gelmeden site yayına alınmaz.
- Görsel 71 (orijinaldeki e-posta kayıt kutusu) ve bonus'taki reklam kısımları bilerek çıkarıldı.
- `06-bonus` içindeki 4, 5 ve 6. maddeler orijinalde gömülü tweet. Çeviride düz metin olarak duruyorlar.
