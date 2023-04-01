export const fetchTodos = () => {
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .catch(err => console.error(err))
}