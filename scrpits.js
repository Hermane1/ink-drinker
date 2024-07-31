document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    
    // Star rating functionality
    stars.forEach(star => {
        star.addEventListener('click', () => {
            stars.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
            console.log('Star selected:', star);
        });
    });

    // Sample TBR data
    let tbrList = [];

    // Elements
    const tbrSection = document.getElementById('tbr-list');
    const addBookButton = document.getElementById('add-book-button');
    const bookModal = document.getElementById('book-modal');
    const modalTitle = document.getElementById('modal-title');
    const bookTitleInput = document.getElementById('book-title');
    const bookAuthorInput = document.getElementById('book-author');
    const bookNotesInput = document.getElementById('book-notes');
    const saveButton = document.getElementById('save-button');
    const closeModal = document.querySelector('.close');

    let editIndex = -1;

    // Function to render the TBR list
    function renderTBRList() {
        tbrSection.innerHTML = '';
        tbrList.forEach((book, index) => {
            const bookCard = document.createElement('div');
            bookCard.className = 'tbr-card';

            const bookBody = document.createElement('div');
            bookBody.className = 'tbr-card-body';

            const bookTitle = document.createElement('h3');
            bookTitle.className = 'tbr-card-title';
            bookTitle.textContent = book.title;

            const bookAuthor = document.createElement('p');
            bookAuthor.className = 'tbr-card-text';
            bookAuthor.textContent = `Author: ${book.author}`;

            const bookNotes = document.createElement('p');
            bookNotes.className = 'tbr-card-text';
            bookNotes.textContent = `Notes: ${book.notes}`;

            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'btn-group';

            const editButton = document.createElement('button');
            editButton.className = 'btn-edit';
            editButton.textContent = 'Edit';
            editButton.onclick = () => openModal('edit', index);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn-delete';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteBook(index);

            buttonGroup.appendChild(editButton);
            buttonGroup.appendChild(deleteButton);

            bookBody.appendChild(bookTitle);
            bookBody.appendChild(bookAuthor);
            bookBody.appendChild(bookNotes);
            bookBody.appendChild(buttonGroup);

            bookCard.appendChild(bookBody);
            tbrSection.appendChild(bookCard);
        });
        console.log('TBR List rendered:', tbrList);
    }

    // Function to open modal
    function openModal(mode, index = -1) {
        if (mode === 'edit') {
            modalTitle.textContent = 'Edit Book';
            bookTitleInput.value = tbrList[index].title;
            bookAuthorInput.value = tbrList[index].author;
            bookNotesInput.value = tbrList[index].notes;
            editIndex = index;
        } else {
            modalTitle.textContent = 'Add Book';
            bookTitleInput.value = '';
            bookAuthorInput.value = '';
            bookNotesInput.value = '';
            editIndex = -1;
        }
        bookModal.style.display = 'block';
    }

    // Function to close modal
    function closeModalFn() {
        bookModal.style.display = 'none';
    }

    // Function to save book
    function saveBook() {
        const title = bookTitleInput.value.trim();
        const author = bookAuthorInput.value.trim();
        const notes = bookNotesInput.value.trim();

        if (title && author) {
            if (editIndex >= 0) {
                tbrList[editIndex] = { title, author, notes };
            } else {
                tbrList.push({ title, author, notes });
            }
            renderTBRList();
            closeModalFn();
        } else {
            alert('Title and Author are required!');
        }
    }

    // Function to delete book
    function deleteBook(index) {
        tbrList.splice(index, 1);
        renderTBRList();
    }

    // Function to add book to TBR
    function addBookToTBR(bookTitle) {
        const existingBook = tbrList.find(book => book.title === bookTitle);
        if (!existingBook) {
            tbrList.push({ title: bookTitle, author: 'Unknown', notes: '' });
            renderTBRList();
        } else {
            alert('Book already in TBR list.');
        }
    }

    // Function to remove book from TBR
    function removeBookFromTBR(bookTitle) {
        tbrList = tbrList.filter(book => book.title !== bookTitle);
        renderTBRList();
    }

    // Event listeners for TBR buttons
    document.querySelectorAll('.tbr-btn-add').forEach(button => {
        button.addEventListener('click', () => {
            alert('Added to TBR!');
            const bookTitle = button.getAttribute('data-title'); // Example: Get book title from data attribute
            addBookToTBR(bookTitle);
        });
    });

    document.querySelectorAll('.tbr-btn-remove').forEach(button => {
        button.addEventListener('click', () => {
            alert('Removed from TBR!');
            const bookTitle = button.getAttribute('data-title'); // Example: Get book title from data attribute
            removeBookFromTBR(bookTitle);
        });
    });

    // Event listeners for modal and save button
    addBookButton.addEventListener('click', () => openModal('add'));
    closeModal.addEventListener('click', closeModalFn);
    saveButton.addEventListener('click', saveBook);

    // Initial render of TBR list
    renderTBRList();
});
