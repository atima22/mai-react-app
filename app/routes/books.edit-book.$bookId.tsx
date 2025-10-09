import { useState , useEffect } from "react";
import { Link, useNavigate, useParams } from "@remix-run/react";

export default function AddBoook() {

   const [inputId,setInputId] = useState(0);
   const [inputTitle, setInputTitle] = useState('');
   const [inputAuthor, setInputAuthor] = useState('');
    const navigate = useNavigate();

  const { bookId } = useParams();

  useEffect(() => {
   const fetchDate = async() => {
    
    try{
    const resBook = await fetch(`http://localhost:3000/api/getOneBook/${bookId}`);
    if(resBook.ok) {
     const result = await resBook.json();
     setInputId(result.id,);
     setInputTitle(result.bookTitle);
     setInputAuthor(result.bookAuthor);
    } else{
      alert('API is wrong. ');
    }
    } catch (error) {
      alert('Eroor fetching date:' + error);
    }
   }
   fetchDate();
  },[]);

   const handleSubmit = async (e:any) => {
       e.preventDefault();
       try {
          const resAddBook = await fetch(`http://localhost:3000/api/updateBook`,
            {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify({bookId:inputId , bookTitle: inputTitle, bookAuthor: inputAuthor})
            }
          );
          const result = await resAddBook.json();
          alert('Update book ID: ' + result.message);
           navigate('/books/home')
       } catch (error) {
         alert('Error submitting data: ' + error);
       }
   }
    
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input type="hidden" value={inputId} />
          <h1 className=" text-2xl p-5">แก้ไขหนังสือ</h1>
            <label>ชื่อหนังสือ:</label>
            <input type="text"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            /> <br />
            <label>ชื่อผู้แต่ง:</label>
            <input type="text"
              value={inputAuthor}
              onChange={(e) => setInputAuthor(e.target.value)}
            /> <br />
             <button type="submit" className="bg-purple-100 ">Update Book</button>
        </form>
        <Link to="/books/home" className="bg-purple-100" > Back</Link>
        </>
    );
}