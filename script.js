const API_URL = "http://localhost:3333/tarefas";
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search');
const filterStatus = document.getElementById('filter-status');

// Carregar tarefas
async function loadTasks() {
    let url = API_URL;
    const searchQuery = searchInput.value.toLowerCase();
    const statusFilter = filterStatus.value;

    if (searchQuery) {
        url += `?search=${searchQuery}`;
    }

    if (statusFilter) {
        url += `&status=${statusFilter}`;
    }

    const response = await fetch(url);
    const tasks = await response.json();
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.status === 'concluida') taskItem.classList.add('completed');

        taskItem.innerHTML = `
            <span>${task.title}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">🗑</button>
            <button onclick="editTask(${task.id})">✏</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Adicionar tarefa
document.getElementById('task-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const newTask = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        status: 'pendente'
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    });

    loadTasks();
});

// Excluir tarefa
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadTasks();
}

// Editar tarefa - Redireciona para a página de edição
function editTask(id) {
    window.location.href = `edit.html?id=${id}`;
}

// Carregar tarefas ao iniciar a página
document.addEventListener("DOMContentLoaded", loadTasks);

// Pesquisa
searchInput.addEventListener('input', loadTasks);
filterStatus.addEventListener('change', loadTasks);
