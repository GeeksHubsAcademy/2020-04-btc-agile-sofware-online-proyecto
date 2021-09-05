import "./BookCard.css";
import { useState } from "react";

const BookCard = (props) => {

    // let [book, setBook] = useState(null);

    return (
        <div className="book-box">
            <h2>{props.title}</h2>
            <h3>{props.author}</h3>
            <p>{props.year}</p>
        </div>
    )
}

export default BookCard;