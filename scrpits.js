document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            stars.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
        });
    });
});
