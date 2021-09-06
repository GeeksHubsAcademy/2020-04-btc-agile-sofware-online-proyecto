import "./BookForm.css";
import { useEffect, useState } from "react";
import fetchAddBook from "../../services/fetchNewBook";

export const BookForm = (props) => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState(null);

    useEffect(() => {
    }, [])

    const getTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const getAuthorChange = (event) => {
        setAuthor(event.target.value);
    }

    const getYearChange = (event) => {
        setYear(event.target.value);
    }

    const addBookHandler = async (event) => {
        event.preventDefault();

        await fetchAddBook(title, author, year);

        await props.refresh();
    }

    return (
        <div className="form-box">
            <h2>Formulario nuevo libro</h2>
            <form className="form" onSubmit={addBookHandler}>
                <input className="book-input" type="text" placeholder="Título del libro" required onInput={e => getTitleChange(e)}></input>
                <input className="book-input" type="text" placeholder="Autor" required onInput={e => getAuthorChange(e)}></input>
                <input className="book-input" type="number" placeholder="Año" required onInput={e => getYearChange(e)}></input>
                {/* <input className="book-input" type="text" placeholder="Url" onInput={e => getUrlChange(e)}></input> */}
                <button className="add-button" type="submit">Agregar</button>
            </form>
        </div>
    )
}

export default BookForm;