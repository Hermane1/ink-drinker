document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    
    // Star rating functionality
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            stars.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
            console.log('Star selected:', index + 1); // Log star index
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
    const closeModalButton = document.querySelector('.close'); // Renamed for clarity

    let editIndex = -1;

    // Function to render the TBR list
    function renderTBRList() {
        tbrSection.innerHTML = '';
        tbrList.forEach((book, index) => {
            const bookCard = document.createElement('div');
            bookCard.className = 'col-md-3 mb-4';

            const card = document.createElement('div');
            card.className = 'card';

            const bookImg = document.createElement('img');
            bookImg.className = 'card-img-top';
            bookImg.src = 'https://via.placeholder.com/150';
            bookImg.alt = 'Book Cover';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const bookTitle = document.createElement('h5');
            bookTitle.className = 'card-title';
            bookTitle.textContent = book.title;

            const bookAuthor = document.createElement('p');
            bookAuthor.className = 'card-text';
            bookAuthor.textContent = `Author: ${book.author}`;

            const bookNotes = document.createElement('p');
            bookNotes.className = 'card-text';
            bookNotes.textContent = `Notes: ${book.notes}`;

            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'btn-group';

            const editButton = document.createElement('button');
            editButton.className = 'btn btn-warning';
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => openModal('edit', index));

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteBook(index));

            buttonGroup.appendChild(editButton);
            buttonGroup.appendChild(deleteButton);

            cardBody.appendChild(bookTitle);
            cardBody.appendChild(bookAuthor);
            cardBody.appendChild(bookNotes);
            cardBody.appendChild(buttonGroup);

            card.appendChild(bookImg);
            card.appendChild(cardBody);

            bookCard.appendChild(card);
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

    // Event listeners for modal and save button
    addBookButton.addEventListener('click', () => openModal('add'));
    closeModalButton.addEventListener('click', closeModalFn);
    saveButton.addEventListener('click', saveBook);

    // Initial render of TBR list
    renderTBRList();
});
