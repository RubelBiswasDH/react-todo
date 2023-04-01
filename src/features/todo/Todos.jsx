import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';

// Import Component
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import StyledModal from '../../component/common/StyledModal';

// Import Hooks
import { useSelector, useDispatch } from 'react-redux';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Import Actions and Methods
import { fetchTodos } from '../../utils/fetchUtils';
import { setSelectedTodo, setIsEditTodoModalOpen, setNewTodo, setIsAddTodoModalOpen } from '../todo/todoSlice';

const Todos = () => {
    const dispatch = useDispatch();

    // States
    const [ todos, setTodos ] = useLocalStorage('todos', []);

    // Redux Stores Data
    const newTodo = useSelector(state => state?.todo?.newTodo ?? null);
    const isAddTodoModalOpen = useSelector(state => state?.todo?.isAddTodoModalOpen ?? false);
    const selectedTodo = useSelector(state => state?.todo?.selectedTodo ?? null);
    const isEditTodoModalOpen = useSelector(state => state?.todo?.isEditTodoModalOpen ?? false);

    // On Edit Todo Modal Close
    const _handleEditTodoClose = () => {
        dispatch( setIsEditTodoModalOpen(false) )
        dispatch( setSelectedTodo(null) )
    }

    // Handle Remove To Do
    const _handleRemoveTodo = (id) => {
        const updatedTodos = todos?.filter(t => t?.id !== id) || null
        setTodos(updatedTodos)
    }
      
    // Handle Edit Todo
    const _handleEditTodo = (todo) => {
        dispatch( setIsEditTodoModalOpen(true) )
        dispatch( setSelectedTodo(todo) )
    }
      
    // Selected Todo Change Event
    const _handleSelectedTodoChange = (e) => {
        dispatch( setSelectedTodo({
            ...selectedTodo,
            title: e?.target?.value ?? ''
        }) )
    }
    
    // Save Todos
    const _handleSaveTodo = ( todoList, selectedTodo ) => {
        const unchangedTodos = todoList?.filter(t => t?.id !== selectedTodo?.id)
        setTodos([ selectedTodo, ...unchangedTodos ])
        _handleEditTodoClose()
    }
    
    // Close Add Todo Modal
    const _handleAddTodoClose = () => {
        dispatch( setIsAddTodoModalOpen(false) )
        dispatch( setNewTodo(null) )
    }
    
    // Add Todo
    const _handleAddTodo = (todos, todo) => {
        const newTodo = {
            ...todo,
            userId:	1,
            completed:	false,
            id: nanoid(5)
        }
        setTodos([ newTodo, ...todos ])
        _handleAddTodoClose()
      }
    
    // New Todo Change
    const _hanleNewTodoChange = (e) => {
        dispatch( setNewTodo({
            ...newTodo,
            title: e?.target?.value ?? ''
        }) )
    }
    
    // Open Add Todo Modal
    const _handleAddTodoModalOpen = () => {
        dispatch( setIsAddTodoModalOpen(true) )
    }
    
    // Set Initial Todos
    const _setInitialTodos = () => {
        const existingTodos = JSON.parse(localStorage.getItem('todos') ?? '')
        if(!existingTodos || existingTodos?.length <= 0){
            fetchTodos()
                .then(todos => {
                    setTodos(todos?.splice(0,10))
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }
    
    useEffect(() => {
        _setInitialTodos()
    }, [])

    return (
        <div style={ containerStyles }>
            <div style={ topSectionStyles }>
                <span className="font-weight-bold">{ 'Todo List' }</span>
                <Button size="sm" onClick={_handleAddTodoModalOpen}>{ 'Add New Todo' }</Button>
            </div>
            <ListGroup>
                { todos?.map((t, idx) => (
                    <ListGroup.Item key={ t?.id ?? idx }>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                            <span>{ `${ t?.title ?? '' }` }</span>
                            <Button size="sm" variant="danger" onClick={ () => _handleRemoveTodo(t?.id ?? '') }>{ 'Delete' }</Button>
                            <Button size="sm" onClick={ () => _handleEditTodo(t ?? '') }>{ 'Edit' }</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <StyledModal
                title={ 'Edit Todo' }
                isOpen={ isEditTodoModalOpen }
                onClose={ _handleEditTodoClose }
                onOk={ () => _handleSaveTodo(todos, selectedTodo) }
            >
                <textarea 
                    onChange={ _handleSelectedTodoChange } 
                    value={ selectedTodo?.title ?? '' }  
                    className="form-control"  
                    rows="3"
                >
                </textarea>
            </StyledModal>
            <StyledModal
                title={ 'Add Todo' }
                isOpen={ isAddTodoModalOpen }
                onClose={ _handleAddTodoClose }
                onOk={ () => _handleAddTodo(todos, newTodo) }
            >
                <textarea 
                    onChange={ _hanleNewTodoChange } 
                    value={ newTodo?.title ?? '' }  
                    className="form-control"  
                    rows="3"
                >
                </textarea>
            </StyledModal>
        </div>
    );
}

// JSX Styles
const containerStyles = { 
    padding: '16px 16px', 
    minHeight: '100vh', 
    backgroundImage: `linear-gradient(-20deg, #6CACFF 0%, #8DEBFF 100%)`
}

const topSectionStyles = {
    display: 'flex', 
    width: '100%', 
    padding: '8px 8px', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
}

export default Todos
