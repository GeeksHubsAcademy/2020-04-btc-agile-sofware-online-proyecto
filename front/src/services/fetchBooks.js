const getAllBooks = async () => {
    try {
        console.log("Obteniendo libros...");
        const object = await fetch("http://localhost:3001/book", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })

        return object;

    } catch (error) {
        return error;
    }
}

export default getAllBooks;