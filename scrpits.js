document.addEventListener('DOMContentLoaded', () => {
    // Star rating system
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            stars.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
        });
    });

    // Add to TBR button functionality
    document.querySelectorAll('.tbr-btn-add').forEach(button => {
        button.addEventListener('click', () => {
            alert('Added to TBR!');
            // Add functionality to actually add the book to the TBR list
        });
    });

    // Remove from TBR button functionality
    document.querySelectorAll('.tbr-btn-remove').forEach(button => {
        button.addEventListener('click', () => {
            alert('Removed from TBR!');
            // Add functionality to actually remove the book from the TBR list
        });
    });

    // Sample TBR data (this can be replaced with actual data storage)
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

    let editIndex = -1; // Track the index of the book being edited

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

    // Function to delete book from TBR list
    function deleteBook(index) {
        tbrList.splice(index, 1);
        renderTBRList();
    }

    // Event listeners
    addBookButton.addEventListener('click', () => openModal('add'));
    closeModal.addEventListener('click', closeModalFn);
    saveButton.addEventListener('click', saveBook);

    // Initial render of TBR list
    renderTBRList();
});
