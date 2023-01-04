
const note = document.querySelector('.note');
const title = document.querySelector('.title-in > input');
const author = document.querySelector('.author-in > input');
const isbn = document.querySelector('.isbn-in > input');
const buttonAddBook = document.querySelector('.but-add-book');
const noBooksPara = document.querySelector('.no-books');
const innersParent = document.querySelector('.inners-inf');

// Variable 
let addInf = [];

if (window.localStorage.getItem('book')) {
  addInf = JSON.parse(window.localStorage.getItem('book'));
  returnInformationFromLocal(addInf); 
  removeBook(addInf);
}

buttonAddBook.addEventListener('click', () => {

  if (title.value.trim() && author.value.trim() && isbn.value.trim()) {

    const obInformation = {
      id: Date.now(),
      title: title.value,
      author: author.value,
      isbn: isbn.value
    }

    addInf.push(obInformation);
    addInformation(addInf);

    innersParent.innerHTML += `
    <div class="inner">
      <span class="name">${obInformation.title}</span>
      <span class="au">${obInformation.author}</span>
      <span class="id">${obInformation.isbn}</span>
      <span class="close" id= "${obInformation.id}"><i class="fa-solid fa-xmark"></i></span>
    </div>
    `
    noBooksPara.classList.add('d-none-p');
    note.innerHTML = `Book Added`
    note.classList.add('right');
    window.setTimeout(() => {
      note.classList.remove('right');
      note.classList.remove('failed');
    }, 4000)
    title.value = '';
    author.value = '';
    isbn.value = '';
  }

  else {  
    note.innerHTML = `Please Fill In All fields`
    note.classList.add('failed');
    note.classList.remove('right');
    window.setTimeout(() => {
      note.classList.remove('failed');
    }, 4000)
  }
  removeBook(addInf);
})

window.addEventListener('keypress', (event) => {
  if (event.key === "Enter") {
    buttonAddBook.click();
  }
})

// Add Information To Local Storage 
function addInformation(array) {
  window.localStorage.setItem('book', JSON.stringify(array));
}

// return Information From Local Storage
function returnInformationFromLocal(array) {
  if (array.length) {
    noBooksPara.classList.toggle('d-none-p');
  }

  else {
    noBooksPara.classList.remove('d-none-p');
  }

  array.forEach((item) => {
    innersParent.innerHTML += `
    <div class="inner">
      <span class="name">${item.title}</span>
      <span class="au">${item.author}</span>
      <span class="id">${item.isbn}</span>
      <span class="close" id= "${item.id}"><i class="fa-solid fa-xmark"></i></span>
    </div>
    `
  })
}

// Remove Book From Books And Local Storage
function removeBook(array) {
  const inner = document.querySelectorAll('.inner');
  const closeIcons = document.querySelectorAll('.close');

  closeIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      inner[index].remove();
      array.forEach((item, counter) => {
        if (item.id == icon.id) {
          array.splice(counter, 1);
          addInformation(array);

          if (array.length) {
            noBooksPara.classList.add('d-none-p');
          }
        
          else {
            noBooksPara.classList.remove('d-none-p');
          }

          note.innerHTML = `Book Removed`
          note.classList.add('right');
          note.classList.remove('failed');
          window.setTimeout(() => {
            note.classList.remove('right');
          }, 4000)
        }
      })
    })
  })
} 