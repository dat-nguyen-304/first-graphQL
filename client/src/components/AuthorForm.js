import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useQuery, useMutation } from '@apollo/client';
import { addSingleAuthor } from '../graphql-client/mutations';
import { getAuthors } from '../graphql-client/queries';

const AuthorForm = () => {
    const [newAuthor, setNewAuthor] = useState({
        name: '',
        age: '',
    })
    const [addAuthor, dataMutation] = useMutation(addSingleAuthor);

    const onInputChange = event => {
        setNewAuthor({
            ...newAuthor,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault();
        if (newAuthor.name && newAuthor.age) {
            addAuthor({
                variables: {
                    name: newAuthor.name,
                    age: parseInt(newAuthor.age)
                },
                refetchQueries: [{ query: getAuthors }]
            });
            setNewAuthor({
                name: '',
                age: ''
            })
        }
    }

    return (
        <Form onSubmit={ onSubmit }>
            <Form.Group className='my-3 invisible'>
                <Form.Control />
            </Form.Group>
            <Form.Group className='my-3'>
                <Form.Control type="text" placeholder='Author name' name="name" value={ newAuthor.name } onChange={ onInputChange } />
            </Form.Group>
            <Form.Group className='my-3'>
                <Form.Control type="text" placeholder='Author age' name="age" value={ newAuthor.age } onChange={ onInputChange } />
            </Form.Group>
            <Button className="float-end" variant='info' type='submit'>Add Author</Button>
        </Form>
    )
}

export default AuthorForm