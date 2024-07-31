document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            stars.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
        });
    });
});
document.querySelectorAll('.tbr-btn-add').forEach(button => {
    button.addEventListener('click', () => {
        alert('Added to TBR!');
        // Add functionality to actually add the book to the TBR list
    });
});

document.querySelectorAll('.tbr-btn-remove').forEach(button => {
    button.addEventListener('click', () => {
        alert('Removed from TBR!');
        // Add functionality to actually remove the book from the TBR list
    });
});
