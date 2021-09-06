import React, { useEffect, useState } from 'react';
import BookCard from "../components/bookCard/BookCard";
import BookForm from "../components/bookForm/BookForm";
import getAllBooks from '../services/fetchBooks';

import "./DisplayBooks.css";

export const DisplayBooks = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        console.log("useEffect");
        getBooks();
    }, []);


    const getBooks = async () => {
        console.log("en get books");
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

            <h2>Libros disponibles</h2>

            <div className="display-books-box">
                {books.map(book => <BookCard
                    title={book.title}
                    author={book.author}
                    year={book.year}
                ></BookCard>)}
            </div>

        </div>
    )
}