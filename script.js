const campoTarefa = document.getElementById("tarefa");

const botaoAdicionar = document.getElementById("adicionar");

const listaTarefas = document.getElementById("listaTarefas");

const contador = document.getElementById("contador");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

botaoAdicionar.addEventListener("click", adicionarTarefa);

campoTarefa.addEventListener("keydown", function (evento) {

    if (evento.key === "Enter") {
        adicionarTarefa();
    }

});


function adicionarTarefa() {

    const texto = campoTarefa.value.trim();

    if (!texto) {
        return;
    }

    const novaTarefa = {
        texto: texto,
        concluida: false
    };

    tarefas.push(novaTarefa);

    salvarTarefas();

    renderizarTarefas();

    campoTarefa.value = "";
}


function salvarTarefas() {

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}

function salvarTarefas() {

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}

function atualizarContador() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(function (tarefa) {
        return tarefa.concluida;
    }).length;

    const pendentes = total - concluidas;

    contador.textContent =
        `${pendentes} pendentes • ${concluidas} concluídas • ${total} no total`;
}

function renderizarTarefas() {

    listaTarefas.innerHTML = "";

    tarefas.forEach(function (tarefa, indice) {

        const item = document.createElement("li");

const textoTarefa = document.createElement("span");

textoTarefa.textContent = tarefa.texto;

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        const botaoConcluir = document.createElement("button");

        botaoConcluir.classList.add("botao-concluir");

        botaoConcluir.textContent = tarefa.concluida
    ? "Desfazer"
    : "Concluir";
    
        botaoConcluir.addEventListener("click", function () {

            tarefa.concluida = !tarefa.concluida;

            salvarTarefas();

            renderizarTarefas();

        });

        const botaoExcluir = document.createElement("button");

        botaoExcluir.classList.add("botao-excluir");

        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function () {

            tarefas.splice(indice, 1);

            salvarTarefas();

            renderizarTarefas();

        });
        
        item.appendChild(textoTarefa);

        item.appendChild(botaoConcluir);

        item.appendChild(botaoExcluir);

        listaTarefas.appendChild(item);

    });

    atualizarContador();
}


renderizarTarefas();
