// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== MAIN INITIALIZATION =====
function initializeApp() {
    setupFormHandler();
    setupSmoothScrolling();
    setupHeaderEffects();
    setupScrollAnimations();
}

// ===== FORM SUBMISSION HANDLER =====
function setupFormHandler() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
}

function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const nome = formData.get('nome');
    const telefone = formData.get('telefone');
    const email = formData.get('email');
    const mensagem = formData.get('mensagem');
    
    // Validate form data
    if (!validateFormData({ nome, telefone, email, mensagem })) {
        return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = createWhatsAppMessage({ nome, telefone, email, mensagem });
    
    // WhatsApp URL (replace with actual number)
    const whatsappURL = `https://wa.me/5541999999999?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    event.target.reset();
}

// ===== FORM VALIDATION =====
function validateFormData({ nome, telefone, email, mensagem }) {
    if (!nome.trim()) {
        alert('Por favor, preencha o nome completo.');
        return false;
    }
    
    if (!telefone.trim()) {
        alert('Por favor, preencha o telefone.');
        return false;
    }
    
    if (!email.trim() || !isValidEmail(email)) {
        alert('Por favor, preencha um email válido.');
        return false;
    }
    
    if (!mensagem.trim()) {
        alert('Por favor, descreva o problema do seu microondas.');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== WHATSAPP MESSAGE CREATION =====
function createWhatsAppMessage({ nome, telefone, email, mensagem }) {
    return `Olá! Gostaria de solicitar um orçamento para conserto de microondas.

*Nome:* ${nome}
*Telefone:* ${telefone}
*E-mail:* ${email}
*Problema:* ${mensagem}

Aguardo retorno. Obrigado!`;
}

// ===== SUCCESS MESSAGE =====
function showSuccessMessage() {
    alert('Redirecionando para WhatsApp... Caso não abra automaticamente, entre em contato pelo telefone (41) 3332-8000');
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}

function handleSmoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== HEADER SCROLL EFFECTS =====
function setupHeaderEffects() {
    window.addEventListener('scroll', handleHeaderScroll);
}

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        prepareCardForAnimation(card);
        observer.observe(card);
    });
}

function prepareCardForAnimation(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    // Log page load time for performance monitoring
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);