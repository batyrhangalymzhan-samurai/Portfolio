// 1. Анимация появления
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// 2. Плавный скролл по меню (Обо мне будет лететь ВВЕРХ)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.onclick = (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    };
});

// 3. Модалка
const modal = document.getElementById('modal');
function openModal() { modal.style.display = 'flex'; }
function closeModal() { modal.style.display = 'none'; }
window.onclick = (e) => { if (e.target == modal) closeModal(); };

// 4. Кнопка Вверх
const topBtn = document.getElementById('scrollTop');
window.onscroll = () => {
    topBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
};
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// 5. Отправка в WhatsApp
document.getElementById('contact-form').onsubmit = function(e) {
    e.preventDefault();
    const name = this.elements[0].value;
    const email = this.elements[1].value;
    const msg = this.elements[2].value;
    
    const text = `Салам, Батырхан! 👋\nМеня зовут ${name} (${email}).\nПроект: ${msg}`;
    window.open(`https://wa.me/77055755098?text=${encodeURIComponent(text)}`, '_blank');
    
    closeModal();
    this.reset();
};