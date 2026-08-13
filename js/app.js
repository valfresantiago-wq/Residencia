// ==========================================
// MENÚ MÓVIL (Hamburguesa)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('open');
            const expanded = navList.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', expanded);
        });
    }

    // Cerrar menú al hacer clic en un enlace (mejora UX)
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
});

// ==========================================
// SCROLL SUAVE PARA ENLACES INTERNOS (Smooth Scroll)
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==========================================
// ANIMACIÓN DE NÚMEROS EN ESTADÍSTICAS (Opcional)
// Si agregas la sección de estadísticas, este código la activa.
// ==========================================
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const count = parseInt(el.dataset.count) || 0;
                let current = 0;
                const increment = Math.ceil(count / 40);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= count) {
                        el.textContent = count;
                        clearInterval(timer);
                    } else {
                        el.textContent = current;
                    }
                }, 30);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => observer.observe(num));
}

// Iniciar animación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', animateNumbers);
