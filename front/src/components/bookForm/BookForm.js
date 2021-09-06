import "./BookForm.css";
import { useState } from "react";

export const BookForm = (props) => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [coverPath, setCoverPath] = useState("");

    const addBookHandler = (event) => {
        console.log("libro agregado")
    }

    return (
        <div className="form-box">
            <h2>Formulario nuevo libro</h2>
            <form className="form" onSubmit={addBookHandler}>
                <input className="book-input" type="text" placeholder="Título del libro" required></input>
                <input className="book-input" type="text" placeholder="Author" required></input>
                <input className="book-input" type="number" placeholder="Año" required></input>
                <input className="book-input" type="text" placeholder="Url" required></input>
            </form>
        </div>
    )
}

export default BookForm;