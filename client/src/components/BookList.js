import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import BookDetail from './BookDetail';
import { getBooks } from '../graphql-client/queries';
import { useQuery } from '@apollo/client';


const BookList = () => {
    const [bookSelected, setBookSelected] = useState(null);


    const { loading, error, data } = useQuery(getBooks);

    if (loading) return <p>Loading books .... </p>
    if (error) return <p>Error Loading books! </p>
    return (
        <Row>
            <Col xs={ 8 }>
                <Row className='row-cols-4 g-2'>
                    {
                        data.books.map(book => (
                            <Col key={ book.id }>
                                <Card
                                    border='info'
                                    text='info'
                                    className='text-center shadow'
                                    style={ { cursor: 'pointer' } }
                                    onClick={ () => setBookSelected(book.id) }
                                >
                                    <Card.Body>{ book.name }</Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Col>
            <Col>
                <BookDetail bookId={ bookSelected } />
            </Col>
        </Row>
    )
}

export default BookList