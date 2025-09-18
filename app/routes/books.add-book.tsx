import { useState } from "react";

export default function AddBoook() {

   const [inputTitle, setInputTitle] = useState('');
   const [inputAuthor, setInputAuthor] = useState('');

   const handleSubmit = (e) => {
    alert(`Title: ${inputTitle}, Author: ${inputAuthor}`);
       e.preventDefault();
   }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>ชื่อหนังสือ:</label>
            <input type="text"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
            <label>ชื่อผู้แต่ง:</label>
            <input type="text"
              value={inputAuthor}
              onChange={(e) => setInputAuthor(e.target.value)}
            />
             <button type="submit">Add Book</button>
        </form>
    );
}