const dropdownFuncionarios = [];

let selectFuncionario = document.querySelector('[name="dropdownFuncionarios"]');

fetch('http://localhost:3000/funcionarios')
    .then(response => response.json())
    .then(data => {
        let funcionarios = data.map(dadosFuncionario => dadosFuncionario.nome);
        dropdownFuncionarios.push(...funcionarios);
        criarOption(selectFuncionario);
    });

function criarOption(select) {
    dropdownFuncionarios.forEach(funcionario => {
        let novaOption = document.createElement('option');
        novaOption.text = funcionario;
        novaOption.value = funcionario;
        select.appendChild(novaOption);
    });
}
