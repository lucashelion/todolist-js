var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');
var aElement = document.querySelector('#app a');

var todolistExemplo = [
    {nome: 'Estudar programação', stFeito: false },
    {nome: 'Iniciar curso online', stFeito: false },
    {nome: 'Levar flores para a esposa', stFeito: false },
    {nome: 'Comprar teclado novo', stFeito: false }
];

var todolist = JSON.parse(localStorage.getItem('todolist_testelh')) || todolistExemplo;

function renderTodolist(){
    listElement.innerHTML = '';
    for (item of todolist){
        var todoElement = document.createElement('li');

        var todoSpan = document.createElement('span');
        var todoText = document.createTextNode(item.nome + ' ');
        if(item.stFeito) 
            todoSpan.setAttribute('style', 'text-decoration: line-through; font-weight: bold;');
        todoSpan.appendChild(todoText);
        todoSpan.setAttribute('class', 'todo-item-text');

        var indice = todolist.indexOf(item);

        var feitoElement = document.createElement('a');
        feitoElement.setAttribute('href', '#');
        var feitoText = document.createTextNode('Feito');
        if(item.stFeito)
            feitoText = document.createTextNode('Desfazer');
        feitoElement.appendChild(feitoText);
        feitoElement.setAttribute('onclick', 'feitoTodoItem(' + indice + ')');
        feitoElement.setAttribute('class', 'botao-feito');

        var excluirElement = document.createElement('a');
        excluirElement.setAttribute('href', '#');
        var excluirText = document.createTextNode('Excluir');
        excluirElement.appendChild(excluirText);
        excluirElement.setAttribute('onclick', 'excluirTodoItem(' + indice + ')');
        excluirElement.setAttribute('class', 'botao-excluir');
        
        var blanckElement = document.createElement('span');
        var blanckText = document.createTextNode(' ');
        blanckElement.appendChild(blanckText);

        todoElement.appendChild(todoSpan);
        todoElement.appendChild(feitoElement);
        todoElement.appendChild(blanckElement);
        todoElement.appendChild(excluirElement);

        listElement.appendChild(todoElement);
    }
}
renderTodolist();

function addTodoItem(){
    var tarefa = inputElement.value;
    if(tarefa == '' || tarefa == null){
        alert('Por favor, digite uma tarefa');
        return;
    }
    var novoItem = {nome: tarefa, stFeito: false };
    todolist.push(novoItem);
    inputElement.value = '';
    renderTodolist();
    saveToStorage();
}
buttonElement.onclick = addTodoItem;

function excluirTodoItem(indice){
    todolist.splice(indice, 1);
    renderTodolist();
    saveToStorage();
}

function feitoTodoItem(indice){
    todolist[indice].stFeito = !todolist[indice].stFeito;
    renderTodolist();
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('todolist_testelh', JSON.stringify(todolist));
}

function gerarExemplo(){
    todolist = todolistExemplo;
    renderTodolist();
    saveToStorage();
}
aElement.onclick = gerarExemplo;