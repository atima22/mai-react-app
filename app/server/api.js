import express from 'express';

const app = express()
const port = 3000

let books = [
    {id:1,title:"Web Technology", author:"atima 1"},
    {id:2,title:"Web Technology", author:"atima 2"}
]
 
app.get('/', (req, res) => {
res.send('Hello World!')
})

app.post('/api/books', (rep, res) => {
    const { title,author } = rep.body
    const newBook = { id: String(books.length), title , author};
    books.push(newBook);
    res.status(201).json(newBook);
})
 
app.listen(port, () => {
console.log( `Example app listening on port ${port}`)
})