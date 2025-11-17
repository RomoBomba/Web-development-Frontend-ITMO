(function() {
    'use strict';

    const loadStartTime = performance.now();
    function setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');

            if (linkHref === currentPath ||
                (currentPath.endsWith('/') && linkHref === 'index.html') ||
                (currentPath.endsWith(linkHref)) ||
                (linkHref === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')))) {
                link.classList.add('nav__link--active');
            }
        });
    }

    function displayLoadTime() {
        const loadEndTime = performance.now();
        const loadTime = (loadEndTime - loadStartTime) / 1000;
        const loadTimeElement = document.createElement('div');
        loadTimeElement.className = 'load-time-info';
        loadTimeElement.innerHTML = `
            <p>Время загрузки страницы: <strong>${loadTime.toFixed(3)}</strong> секунд</p>
        `;

        const footer = document.querySelector('.footer');
        if (footer) {
            const container = footer.querySelector('.container');
            if (container) {
                container.appendChild(loadTimeElement);
            }
        }
    }

    function handleCreditForm() {
        const form = document.querySelector('.form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                const formData = {
                    type: document.getElementById('application-type').value,
                    name: document.getElementById('name').value,
                    phone: document.getElementById('phone').value,
                    email: document.getElementById('email').value,
                    amount: document.getElementById('amount').value,
                    period: document.getElementById('period').value
                };

                if (!validateForm(formData)) {
                    return;
                }

                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Отправка...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    showNotification(`Спасибо, ${formData.name}! Ваша заявка на ${formData.amount} руб. принята. Мы свяжемся с вами в ближайшее время.`, 'success');
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    }

    function validateForm(data) {
        if (!data.name || data.name.length < 2) {
            showNotification('Введите корректное ФИО', 'error');
            return false;
        }

        if (!data.phone || !/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
            showNotification('Введите корректный телефон', 'error');
            return false;
        }

        if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
            showNotification('Введите корректный email', 'error');
            return false;
        }

        if (!data.amount || data.amount < 5000) {
            showNotification('Минимальная сумма кредита - 5,000 руб.', 'error');
            return false;
        }

        return true;
    }

    function enhanceProductCards() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-5px) scale(1)';
            });

            card.addEventListener('click', function(e) {
                if (!e.target.classList.contains('product-card__link')) {
                    const productName = this.querySelector('.product-card__link').textContent;
                    console.log(`Выбрана гитара: ${productName}`);
                }
            });
        });
    }

    function initGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                this.classList.toggle('gallery-item--zoomed');
            });
        });
    }

    window.addEventListener('load', function() {
        setActiveNavItem();
        displayLoadTime();
        handleCreditForm();
        enhanceProductCards();
        initGallery();

        console.log('MusicStore: все компоненты инициализированы');
    });

    document.addEventListener('DOMContentLoaded', function() {
        console.log('MusicStore: страница загружена');
    });

})();