import React, { Fragment } from 'react'
import Card from 'react-bootstrap/Card'
import { getBook } from '../graphql-client/queries';
import { useQuery } from '@apollo/client';


const BookDetail = ({ bookId }) => {
    const { loading, error, data } = useQuery(getBook, {
        variables: {
            id: bookId
        },
        skip: bookId === null
    });

    if (loading) return <p>Loading book detail.... </p>
    if (error && bookId !== null) return <p>Error Loading books! </p>
    const book = !loading && !error && data && data.book;
    return (
        <Card bg="info" text="white" className="text-start shadow">
            <Card.Body>
                { bookId === null ? <Card.Title>See detail of one book by clicking</Card.Title> :
                    <>
                        <Card.Title>{ book.name }</Card.Title>
                        <Card.Subtitle>{ book.genre }</Card.Subtitle>
                        <p>{ book.author.name }</p>
                        <p>{ book.author.age }</p>
                        <p>All books by this author</p>
                        <ul>
                            {
                                book.author.books.map(b => {
                                    return <li key={ b.id }>{ b.name }</li>
                                })
                            }
                        </ul>
                    </> }

            </Card.Body>
        </Card>
    )
}

export default BookDetail