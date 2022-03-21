
const list = document.querySelector('ul');

api.receive('todo:add', todo => {
    const li = document.createElement('li');
    const text = document.createTextNode(todo);

    debugger;

    li.appendChild(text);
    list.appendChild(li);
});

api.receive('todo:clear', () => {
    list.innerHTML = '';
})