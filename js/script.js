var firebaseConfig = {
    apiKey: "AIzaSyAaGrEhzS6zeACj4nsnazfvyKi1HCxsGwM",
    authDomain: "booklist-57359.firebaseapp.com",
    databaseURL: "https://booklist-57359.firebaseio.com",
    projectId: "booklist-57359",
    storageBucket: "booklist-57359.appspot.com",
    messagingSenderId: "213362404823",
    appId: "1:213362404823:web:89e299341f5eeaee98af92",
    measurementId: "G-XK05BGV0GR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  // Class Book
  class Book {
      constructor(title, author, indexBook) {
          this.title = title;
          this.author = author;
          this.indexBook = indexBook;
      }
  }

  class Operations {
      addBook(book) {
        const table = document.getElementById('list');

        firebase.database().ref('books').push({
            title: book.title,
            author: book.author,
            indexBook: book.indexBook
        });
        firebase.database().ref('books').on('value', (snapshot) => {
            let data = snapshot.val();
            table.innerHTML = '';
            for (const key in data) {
                table.innerHTML += `
                <tr id="${key}">
                    <td>${data[key].title}</td>
                    <td>${data[key].author}</td>
                    <td>${data[key].indexBook}</td>
                    <td><button onclick="deletebook('${key}')" class="btn btn-danger delete">X</button></td>
                </tr>
                `;
            }
        });
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000 
        });
        Toast.fire({
            type: 'success',
            title: 'Book Added'
        });
      }
      clearForm() {
          document.getElementById('title').value = '';
          document.getElementById('author').value = '';
          document.getElementById('indexBook').value = '';
        
    }
  }

  document.getElementById('bookForm').addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const indexBook = document.getElementById('indexBook').value;

      const book = new Book(title, author, indexBook);
      const operations = new Operations();
      operations.addBook(book);
      operations.clearForm();
  })

  function deletebook(key) {
      firebase.database().ref(`books/${key}`).remove();
      const table = document.getElementById('list');
      table.innerHTML = '';
      firebase.database().ref('books').on('value', (snapshot) => {
        let data = snapshot.val();
        for (const key in data) {
            table.innerHTML += `
                <tr id="${key}">
                    <td>${data[key].title}</td>
                    <td>${data[key].author}</td>
                    <td>${data[key].indexBook}</td>
                    <td><button onclick="deletebook('${key}')" class="btn btn-danger delete">X</button></td>
                </tr>
            `;
        }
      });
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000 
      });
      Toast.fire({
        type: 'success',
        title: 'Book Deleted'
      });

  }
  (function() {
    const table = document.getElementById('list');
    table.innerHTML = '';
    firebase.database().ref('books').on('value', (snapshot) => {
        let data = snapshot.val();
        for (const key in data) {
            table.innerHTML += `
                <tr id="${key}">
                    <td>${data[key].title}</td>
                    <td>${data[key].author}</td>
                    <td>${data[key].indexBook}</td>
                    <td><button onclick="deletebook('${key}')" class="btn btn-danger delete">X</button></td>
                </tr>
            `;
        }
      });
  })();