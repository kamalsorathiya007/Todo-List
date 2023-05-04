import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { Container, Col, Row } from 'reactstrap';


const getTodosFromLocalStorage = () => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        return JSON.parse(storedTodos);
    } else {
        return [];
    }
}

const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

const TodoList = () => {
    const navigate = useNavigate()
    const [todos, setTodos] = useState(getTodosFromLocalStorage());

    const addTodo = (title, description) => {
        setTodos([...todos, { title, description, isCompleted: false }]);
    }



    const deleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    useEffect(() => {
        saveTodosToLocalStorage(todos);
    }, [todos]);

    const goToHome = () => {
        navigate("/login")
    }

    return (
        <Container>
            <Row>
                <Col className='text-center'>
                    <div>
                        <Row>
                            <Col col={12}>
                                <h1>To-Do List</h1>
                            </Col>
                            <Col >
                                <Button className='mt-2' variant='outline-warning' onClick={goToHome} >Go To Home </Button>
                            </Col>
                        </Row>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const title = e.target.elements.title.value;
                            addTodo(title);
                            e.target.reset();
                        }}>
                            <Container className=' text-center '>
                                <div className='input-group"'>
                                    <input type="text" id="title" name="title" className='text-center form-control w-50 d-inline  position-relative mt-5' placeholder='Enter Task' required />
                                    <button type="submit" className='btn btn-success p-2 position-absolute btn1 mt-0 mx-1 ms-3 ps-5 pe-5 mt-5 '>Add</button>

                                </div>

                            </Container>

                        </form>
                        <Container className='text-center ms-5' >
                            <div className='col-12 '>
                                <ul className='text-center'>
                                    {todos.map((todo, index) => (
                                        <li key={index} className='list-group-item text-center mt-2 '>
                                            <p className='d-inline mr-3 align-middle mt-2 fs-1 order-2'>{todo.title}</p>
                                            <button className='btn btn-danger ms-4 pb-2 mt-3 ps-4 pe-4' onClick={() => deleteTodo(index)}>Delete</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </Container>

                    </div>
                </Col>
            </Row>
        </Container>

    );
}
export default TodoList;