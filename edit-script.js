const API_URL = "http://localhost:3333/tarefas";

// Carregar a tarefa para edição
async function loadTaskForEditing() {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('id');  // Pega o ID da tarefa na URL

    const response = await fetch(`${API_URL}/${taskId}`);
    const task = await response.json();

    document.getElementById('task-id').value = task.id;
    document.getElementById('edit-title').value = task.title;
    document.getElementById('edit-description').value = task.description;
    document.getElementById('edit-status').value = task.status;
}

// Salvar as alterações da tarefa
document.getElementById('edit-task-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const taskId = document.getElementById('task-id').value;
    const updatedTask = {
        title: document.getElementById('edit-title').value,
        description: document.getElementById('edit-description').value,
        status: document.getElementById('edit-status').value
    };

    await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
    });

    // Redireciona de volta para a página principal após salvar
    window.location.href = "index.html";
});

// Voltar para a página principal
function goBack() {
    window.location.href = "index.html";
}

// Carregar a tarefa para edição assim que a página for carregada
document.addEventListener('DOMContentLoaded', loadTaskForEditing);
