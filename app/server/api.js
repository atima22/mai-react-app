import express from 'express';
import cors from 'cors';

const app = express()
const port = 3000

app.use(express.json());
app.use(cors());

let books = [
    {id:1,title:"Web Technology", author:"atima 1"},
    {id:2,title:"Web Technology", author:"atima 2"}
]
 
app.get('/', (req, res) => {
res.send('Hello World!')
})

app.post('/api/insert', (rep, res) => {
    const { title,author } = rep.body
    const newBook = { id: String(books.length), title , author};
    books.push(newBook);
    res.status(201).json(newBook);
})

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