(function() {
    "use strict";

    console.log("--> KGTU Bot (Aktif Kutu Kilidi Sürümü) Devrede!");

    function processPoll() {
        // Ekrandaki yazilari tara
        const allTexts = Array.from(document.querySelectorAll('span, div, p, label'));
        let activePollBox = null;

        for (let el of allTexts) {
            const txt = (el.innerText || "").toLowerCase().trim();
            
            // SADECE sag alttaki aktif kutuda yer alan spesifik uyariyi ariyoruz.
            // Bu sayede sol menudeki eski sonuclari es geciyoruz.
            if (txt.includes("normal oylama.") || txt.includes("gizli oylama.") || txt.includes("sunucu yanitinizi gorebilir")) {
                
                // Bu uyarinin bulundugu kutuyu (parent elementleri) yukari dogru tariyoruz
                let parent = el.parentElement;
                let depth = 0;
                while (parent && depth < 6) {
                    // Kutunun icinde mavi butonlar (siklar) var mi?
                    const btnsInBox = parent.querySelectorAll('button');
                    if (btnsInBox.length >= 2) {
                        activePollBox = parent;
                        break;
                    }
                    parent = parent.parentElement;
                    depth++;
                }
            }
            if (activePollBox) break;
        }

        // Aktif kutuyu bulduk mu ve onceden islem YAPMADIK mi?
        if (activePollBox && activePollBox.dataset.botProcessed !== "true") {
            console.log("(!) Sistem: Sag alttaki AKTIF anket kutusu tespit edildi.");
            
            // Ayni ankete defalarca basmamasi icin isaretle
            activePollBox.dataset.botProcessed = "true";

            // Hocanin anketi acmasi ve animasyonlarin bitmesi icin 1.2 saniye bekle
            setTimeout(() => {
                let options = Array.from(activePollBox.querySelectorAll('button'));
                
                // Pencereyi kapat/kucult gibi gereksiz butonlari temizle
                options = options.filter(btn => {
                    const btnText = (btn.innerText || "").toLowerCase();
                    const aria = (btn.getAttribute('aria-label') || "").toLowerCase();
                    return !btnText.includes("kapat") && !aria.includes("close") &&
                           !btnText.includes("kucult") && !aria.includes("minimize") &&
                           btn.offsetWidth > 0; 
                });

                if (options.length > 0) {
                    // Kalan gercek siklardan rastgele birini sec
                    const randomBtn = options[Math.floor(Math.random() * options.length)];
                    randomBtn.click();
                    console.log(">> Sistem: Canli anket yanitlandi ->", randomBtn.innerText);
                } else {
                    console.log("Sistem: Kutu bulundu ama tiklanabilir sik bulunamadi.");
                }
            }, 1200); 
        }
    }

    const observer = new MutationObserver((mutations) => {
        let shouldCheck = false;
        for (const m of mutations) {
            if (m.addedNodes.length > 0) {
                shouldCheck = true;
                break;
            }
        }
        if (shouldCheck) processPoll();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Her ihtimale karsi 3 saniyede bir tarama sigortasi
    setInterval(processPoll, 3000);

})();