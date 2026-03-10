(function() {
    "use strict";

    // 1. Eklentinin aktif olduğunu gösteren sol alt rozet
    function addVisualIndicator() {
        if (document.getElementById('kgtu-bot-indicator')) return;
        const indicator = document.createElement('div');
        indicator.id = 'kgtu-bot-indicator';
        indicator.style.cssText = 'position:fixed; bottom:15px; left:15px; background:#28a745; color:white; padding:8px 12px; font-size:13px; z-index:999999; border-radius:8px; font-weight:bold; pointer-events:none; box-shadow: 0 4px 6px rgba(0,0,0,0.3);';
        indicator.innerText = 'BOT NÖBETTE - AKTİF';
        document.body.appendChild(indicator);
    }

    addVisualIndicator();

    // React algılayıcıları
    function triggerReactEvent(element, eventName) {
        const event = new Event(eventName, { bubbles: true });
        element.dispatchEvent(event);
    }

    function setNativeValue(element, value) {
        const valueSetter = Object.getOwnPropertyDescriptor(element, "value").set;
        const prototype = Object.getPrototypeOf(element);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, "value").set;
        if (valueSetter && valueSetter !== prototypeValueSetter) {
            prototypeValueSetter.call(element, value);
        } else {
            valueSetter.call(element, value);
        }
        triggerReactEvent(element, "input");
        triggerReactEvent(element, "change");
    }

    function aggressiveScan() {
        const bodyText = document.body.innerText.toLowerCase();
        const hasPollText = bodyText.includes("normal oylama") || bodyText.includes("gizli oylama") || bodyText.includes("sunucu yanıtınızı") || bodyText.includes("sunucu yanitinizi");

        if (!hasPollText) return; 

        const allDivs = Array.from(document.querySelectorAll('div'));
        let targetBox = allDivs.reverse().find(div => {
            const txt = (div.innerText || "").toLowerCase();
            return (txt.includes("normal oylama") || txt.includes("sunucu yanıtınızı") || txt.includes("sunucu yanitinizi")) 
                   && !div.dataset.botProcessed;
        });

        if (targetBox) {
            targetBox.dataset.botProcessed = "true";

            // A DURUMU: Açık Uçlu (Metin Kutusu)
            const textInput = targetBox.querySelector('input:not([type="hidden"]), textarea');
            if (textInput) {
                setTimeout(() => {
                    setNativeValue(textInput, "-");
                    setTimeout(() => {
                        const btns = Array.from(targetBox.querySelectorAll('button, [role="button"]'));
                        let sendBtn = btns.find(b => (b.innerText || "").toLowerCase().includes("gönder")) || btns.find(b => b.offsetWidth > 0 && !b.disabled);
                        if (sendBtn) {
                            sendBtn.click();
                            // İstediğin klasik tarayıcı bildirimi
                            alert("Gemini yanıtladı! Eklenti metin (-) gönderdi.");
                        }
                    }, 200);
                }, 100);
                return;
            }

            // B DURUMU: Çoktan Seçmeli (A, B, C, D vb.)
            let options = Array.from(targetBox.querySelectorAll('button, [role="button"]')).filter(btn => {
                const txt = (btn.innerText || "").toLowerCase().trim();
                const aria = (btn.getAttribute('aria-label') || "").toLowerCase();
                return !txt.includes("kapat") && !aria.includes("close") && !txt.includes("küçült") && !aria.includes("minimize") && btn.offsetWidth > 0;
            });

            if (options.length > 0) {
                const randomBtn = options[Math.floor(Math.random() * options.length)];
                
                // Seçilen şıkkın metnini al (A, B vb.)
                const secilenSikMetni = randomBtn.innerText.trim() || "bir şıkkı";
                
                setTimeout(() => {
                    randomBtn.click();
                    // Tam attığın fotoğraftaki gibi üstten açılan orijinal bildirim
                    alert(`Gemini yanıtladı! Eklenti ${secilenSikMetni} seçti.`);
                }, 150);
            } else {
                delete targetBox.dataset.botProcessed; 
            }
        }
    }

    setInterval(aggressiveScan, 500); 
    setInterval(addVisualIndicator, 2000); 
})();