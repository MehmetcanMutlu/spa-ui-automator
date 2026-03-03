# spa-ui-automator

`spa-ui-automator`, BBB benzeri tek sayfa uygulamalarda (SPA) aktif anket kutusunu algılayıp uygun seçenekle etkileşime giren bir Chrome content-script otomasyon denemesidir.

## Project Scope
- Manifest V3 tabanlı extension yapısı
- Dinamik DOM değişimlerini `MutationObserver` ile izleme
- Aktif anket kutusunu bağlama göre ayırt etme
- Test/simülasyon için yerel HTML senaryosu (`son_test.html`)
