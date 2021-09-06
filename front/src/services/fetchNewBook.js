const fetchAddBook = async (title, author, year) => {

    try {

        const urlAddBook = 'http://localhost:3001/book';

        const object = await fetch(urlAddBook, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ title: title, author: author, year: year }),
        });

        return object;

    } catch (error) {
        return error;
    }
}

export default fetchAddBook;