// floating-button.js
// Widget de Botón Flotante FerreMaster - Versión Unificada (Slate Style)

(function() {
    // 1. ESTILOS CSS (Identidad FerreMaster + Unificación de Colores)
    const styles = `
        :root {
            --primary-amber: #f59e0b;
            --primary-amber-dark: #d97706;
            --primary-amber-flash: #fbbf24; 
            --dark-slate: #0f172a;
            --amber-shadow: rgba(245, 158, 11, 0.4); 
        }

        @keyframes pulse-amber {
            0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(245, 158, 11, 0); }
            100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }

        .fab-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9990;
            font-family: 'Inter', sans-serif;
        }

        .fab-main {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            cursor: pointer;
            position: relative;
            z-index: 10;
            background-image: linear-gradient(to bottom, var(--primary-amber) 0%, var(--primary-amber-dark) 100%);
            box-shadow: 0 6px 18px var(--amber-shadow);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            animation: pulse-amber 2s infinite;
        }

        /* CENTRADO ABSOLUTO DE ICONOS (+ y X) */
        .fab-main i, .fab-main svg {
            position: absolute;
            top: 50% !important;
            left: 50% !important;
            color: white;
            transition: all 0.4s ease;
            width: 28px;
            height: 28px;
        }

        .fab-main .icon-plus { 
            transform: translate(-50%, -50%) scale(1) rotate(0deg); 
            opacity: 1;
        }
        
        .fab-main.active .icon-plus { 
            transform: translate(-50%, -50%) scale(0) rotate(90deg); 
            opacity: 0;
        }

        .fab-main .icon-close { 
            transform: translate(-50%, -50%) scale(0) rotate(-90deg); 
            opacity: 0;
        }

        .fab-main.active .icon-close { 
            transform: translate(-50%, -50%) scale(1) rotate(0deg); 
            opacity: 1;
        }

        /* EFECTO FLASH AL PASAR EL MOUSE (Botón Principal) */
        .fab-main:hover {
            background-image: none !important;
            background-color: var(--primary-amber-flash) !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
            transform: scale(1.05);
            animation-play-state: paused;
        }

        .fab-main.active {
            background: var(--dark-slate) !important;
            animation: none; 
        }

        .fab-buttons {
            position: absolute;
            bottom: 75px;
            right: 0;
            display: flex;
            flex-direction: column-reverse;
            align-items: center;
            gap: 12px;
            pointer-events: none;
        }

        .fab-buttons.open { pointer-events: auto; }

        .fab-btn {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            opacity: 0;
            transform: scale(0) translateY(25px);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            background-color: var(--dark-slate); /* Color oscuro para todos por defecto */
            position: relative;
        }

        .fab-btn.show { opacity: 1; transform: scale(1) translateY(0); }
        .fab-btn:hover { transform: scale(1.15); filter: brightness(1.2); }

        /* ÚNICA EXCEPCIÓN: WhatsApp en Verde */
        .fab-btn.whatsapp { background-color: #25D366; }

        .fab-btn i { font-size: 18px; }
        .fab-btn.whatsapp i { font-size: 22px; }

        .fab-btn::after {
            content: attr(data-tooltip);
            position: absolute;
            right: 55px;
            background: rgba(15, 23, 42, 0.95);
            color: white;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 9px; 
            font-weight: 700;
            text-transform: uppercase;
            white-space: nowrap;
            opacity: 0;
            transform: translateX(10px);
            transition: all 0.3s ease;
        }
        .fab-btn:hover::after { opacity: 1; transform: translateX(0); }
    `;

    const html = `
        <div class="fab-container" id="fab-container">
            <div class="fab-main" id="fabMain">
                <i data-lucide="plus" class="icon-plus"></i>
                <i data-lucide="x" class="icon-close"></i>
            </div>
            <div class="fab-buttons" id="fabButtons">
                <div class="fab-btn whatsapp" data-tooltip="WhatsApp" data-delay="0"><i class="fa-brands fa-whatsapp"></i></div>
                <div class="fab-btn telegram" data-tooltip="Telegram" data-delay="50"><i class="fa-brands fa-telegram"></i></div>
                <div class="fab-btn facebook" data-tooltip="Facebook" data-delay="100"><i class="fa-brands fa-facebook-f"></i></div>
                <div class="fab-btn instagram" data-tooltip="Instagram" data-delay="150"><i class="fa-brands fa-instagram"></i></div>
                <div class="fab-btn tiktok" data-tooltip="TikTok" data-delay="200"><i class="fa-brands fa-tiktok"></i></div>
                <div class="fab-btn email" data-tooltip="Correo" data-delay="250"><i class="fa-solid fa-envelope"></i></div>
            </div>
        </div>
    `;

    function init() {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = styles;
        document.head.appendChild(styleTag);

        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);

        if(window.lucide) lucide.createIcons({ root: wrapper });

        const main = document.getElementById('fabMain');
        const buttonsContainer = document.getElementById('fabButtons');
        const buttons = document.querySelectorAll('.fab-btn');
        let isOpen = false;

        // Busca esta parte dentro de tu floating-button.js
main.addEventListener('click', () => {
    isOpen = !isOpen;
    
    // 1. Buscamos el elemento del carrito
    const cartElement = document.getElementById('cartFloatBtn');
    
    if (isOpen) {
        main.classList.add('active');
        buttonsContainer.classList.add('open');
        
        // 2. LE DECIMOS AL CARRITO QUE SUBA
        if(cartElement) cartElement.classList.add('moved');
        
        buttons.forEach(btn => {
            setTimeout(() => btn.classList.add('show'), btn.dataset.delay);
        });
    } else {
        main.classList.remove('active');
        
        // 3. LE DECIMOS AL CARRITO QUE BAJE
        if(cartElement) cartElement.classList.remove('moved');
        
        Array.from(buttons).reverse().forEach((btn, i) => {
            setTimeout(() => btn.classList.remove('show'), i * 40);
        });
        setTimeout(() => buttonsContainer.classList.remove('open'), 400);
    }
});

        const setupLink = (cls, url) => {
            const el = document.querySelector(`.fab-btn.${cls}`);
            if(el) el.addEventListener('click', () => window.open(url, '_blank'));
        };

        // CONFIGURACIÓN DE ENLACES
        setupLink('whatsapp', 'https://wa.me/1234567890');
        setupLink('telegram', 'https://t.me/TuUsuario');
        setupLink('facebook', 'https://facebook.com/TuPagina');
        setupLink('instagram', 'https://instagram.com/TuUsuario');
        setupLink('tiktok', 'https://tiktok.com/@TuUsuario');
        const em = document.querySelector('.fab-btn.email');
        if(em) em.addEventListener('click', () => window.location.href = 'mailto:ventas@ferremaster.com');
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();