import React, { useEffect, useState } from 'react';
import BookCard from "../components/bookCard/BookCard";
import BookForm from "../components/bookForm/BookForm";
import getAllBooks from '../services/fetchBooks';

import "./DisplayBooks.css";

export const DisplayBooks = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks();
    }, []);


    const getBooks = async () => {
        try {
            const res = await getAllBooks();
            const json = await res.json();
            setBooks(json);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>

            <BookForm refresh={getBooks}></BookForm>

            <h2 className="list-title">Libros disponibles</h2>

            <div className="display-books-box">
                {books.map(book => <BookCard
                    title={book.title}
                    author={book.author}
                    year={book.year}
                    id={book._id}
                    refresh={getBooks}
                ></BookCard>)}
            </div>

        </div>
    )
}