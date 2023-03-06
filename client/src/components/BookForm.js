import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getAuthors, getBooks } from '../graphql-client/queries';
import { useQuery, useMutation } from '@apollo/client';
import { addSingleBook } from '../graphql-client/mutations';
const BookForm = () => {
    const { loading, error, data } = useQuery(getAuthors);
    const [addBook, dataMutation] = useMutation(addSingleBook);

    const [newBook, setNewBook] = useState({
        name: '',
        genre: '',
        authorId: ''
    })

    const onInputChange = event => {
        setNewBook({
            ...newBook,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault();
        if (newBook.name && newBook.genre && newBook.authorId) {
            addBook({
                variables: {
                    name: newBook.name,
                    genre: newBook.genre,
                    authorId: newBook.authorId
                },
                refetchQueries: [{ query: getBooks }]
            });
            setNewBook({
                name: '',
                genre: '',
                authorId: ''
            })
        }
    }
    return (
        <Form onSubmit={ onSubmit }>
            <Form.Group className='my-3'>
                <Form.Control type="text" name="name" value={ newBook.name } onChange={ onInputChange } placeholder='Book name' />
            </Form.Group>
            <Form.Group className='my-3'>
                <Form.Control type="text" name="genre" value={ newBook.genre } onChange={ onInputChange } placeholder='Book genre' />
            </Form.Group>
            <Form.Group className='my-3'>
                <Form.Select aria-label="Default select example" name="authorId" onChange={ onInputChange } value={ newBook.authorId }>
                    <option value='' disabled>Select author</option>
                    { loading ? <option>Loading authors ....</option> :
                        <>
                            { data.authors.map(author => <option value={ author.id } key={ author.id }>{ author.name }</option>) }
                        </>
                    }
                </Form.Select>
            </Form.Group>
            <Button className="float-end" variant='info' type='submit'>Add book</Button>
        </Form>
    )
}

export default BookForm