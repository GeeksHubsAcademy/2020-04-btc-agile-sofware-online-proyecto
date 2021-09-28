const fetchRemoveBook = async (id) => {
    try {
        const urlRemoveBook = `http://localhost:3001/book/${id}`;

        await fetch(urlRemoveBook, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/json'
            },
        });

    } catch (error) {
        return error;
    }
}

export default fetchRemoveBook;