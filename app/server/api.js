import express from 'express';
import cors from 'cors';

import admin from 'firebase-admin'
import serviceAccount from './firebase/webprog-1009-9-firebase-adminsdk-fbsvc-2a3b6cba89.json' with { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express()
const port = 3000

app.use(express.json());
app.use(cors());

async function fetchOneBook(bookId) {
  const result = [];
  const booksRef = db.collection('Books');
  const snapshot = await booksRef.get();
  snapshot.forEach(doc => {
    if (doc.id === bookId ) {
      result.push({
        id: doc.id,
        ...doc.data()
      });
    }
  });
  return result;
}
 
// URL: http://localhost:3000/api/getOneBook/xxx
app.get('/api/getOneBook/:bookId', (req, res) => {
  const { bookId } = req.params;
  console.log(bookId);
  res.set('Content-type' ,'application/json');
  fetchOneBook(bookId).then((jsonData) => {
    res.status(200).json(jsonData[0]);
  }).catch((error) => {
    res.send({ success: false, message: error.message });
  });
});

async function fetchDataDB() {
  const result = [];
  const booksRef = db.collection('Books');
  const booksSnap = await booksRef.get();
  booksSnap.forEach(doc => {
    result.push({
      id: doc.id,
      ...doc.data()
      });
  });
  return result;
}

// -- UPDATE --
async function updateBook(bookId, bookData) {
  const docRef = db.collection('Books').doc(bookId);
  await docRef.update(bookData);
}
 
// URL: http://localhost:3000/api/updateBook
app.post('/api/updateBook', (req, res) => {
  try {
    const { bookId, bookTitle, bookAuthor } = req.body;
    console.log("Update Data: ", bookId, bookTitle, bookAuthor);
    updateBook(bookId, { bookTitle, bookAuthor });
    res.status(200).json({ success: true, message: 'Book updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
})

// Get data from Books collection
//http://localhost:3000/api/getBooksFromDB
app.get('/api/getBooksFromDB',(req, res) => {
  res.set('Content-type' ,'application/json');
  fetchDataDB().then((jsonData) =>{
    res.json(jsonData);
  }).catch((error) => {
    res.json(error);
  })
});

// -- DELETE --
async function deleteBook(bookId) {
  const docRef = db.collection('Books').doc(bookId);
  await docRef.delete();
}
 
// URL: http://localhost:3000/api/deleteBook/xxx
app.delete('/api/deleteBook/:bookId', (req, res) => {
  const { bookId } = req.params;
  deleteBook(bookId);
  res.status(200).json({ success: true, message: 'Book deleted successfully.' });
})

// http://localhost:3000/api/insert --> Add a new book
async function addBook(bookData) {
  const newBookRef = db.collection('Books').doc();
  const docRef = db.collection('Books').doc(newBookRef.id);
  await docRef.set(bookData);
  console.log('Book added!');
}
 
app.post('/api/insert', (req, res) => {
  try {
    const { bookTitle , bookAuthor } = req.body;
    console.log( bookTitle, bookAuthor);
    //const newBook = { id: String(books.length + 1), title,author };
    const newBook = {bookTitle , bookAuthor };
    // books.push(newBook);
    addBook(newBook);
    res.status(201).json({ success: true, message: 'Form submitted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
})

let books = [
    {id:1,title:"Web Technology", author:"atima 1"},
    {id:2,title:"Web Technology", author:"atima 2"}
]
 
app.get('/', (req, res) => {
res.send('Hello World!')
})


// app.post('/api/insert', (rep, res) => {
//     const { title,author } = rep.body
//     const newBook = { id: String(books.length), title , author};
//     books.push(newBook);
//     res.status(201).json(newBook);
// })

app.get('/api/getbooks', (req,res) => {
  res.json(books);
})
// http://localhost:3000/api/getbooks/1
app.get('/api/getbooks/:book_id', (req,res) => {
  let bid = Number(req.params.book_id);
  const result = books.filter(
    bObj => {
        return bObj.id === bid
    }
  );
  res.json(result[0]);
})

//http://localhost:3000/api/updtte
app.post('/api/update',(req,res ) => {
 const {id, in_title, in_author} = req.body;
 console.log('Date: ', id , in_title , in_author);
 const updbooks = books.map(
    bObj => {
        if(bObj.id === Number(id)) {
         return {...bObj, title: in_title, author: in_author }
        }
        return bObj;
    }
 );
 console.log('Updated:' , updbooks);
 res.json({message: 'Updated...'});
})
 
app.listen(port, () => {
console.log( `Example app listening on port ${port}`)
})