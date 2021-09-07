import "./BookCard.css";
import fetchDeleteBook from '../../services/fetchRemoveBook';
// import { useState } from "react";

const BookCard = (props) => {

    // let [book, setBook] = useState(null);

    const deleteBookHandler = async (event, id) => {
        event.preventDefault();

        await fetchDeleteBook(id);

        await props.refresh();
    }

    return (
        <div className="book-box">
            <h2>{props.title}</h2>
            <h3>{props.author}</h3>
            <p>{props.year}</p>
            <button className="delete-button" onClick={e => deleteBookHandler(e, props.id)}>Eliminar</button>
        </div>
    )
}

export default BookCard;