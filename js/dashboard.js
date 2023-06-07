

const btnCriaFiltro = document.querySelector('.dashboard--boasVindas__filtro');
const filtros = document.querySelectorAll('.filter__container--opcao')

btnCriaFiltro.addEventListener('click', function(){
    filtros.forEach(filtro => {
       filtro.classList.toggle("container-invisivel")
    });
})



//Cria os options de funcionarios de acordo com os funcionarios cadastrados no JSON
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
//Termina bloco de codigo - Options Funcionarios.
//Filtro Funcionaros
selectFuncionario.addEventListener('change', filtroFuncionarios, totalHoras)

function filtroFuncionarios (){
    const tabelaDeLancamentos = document.querySelector('.UltimosCadastros-tabela')
    const funcionarioSelecionado = selectFuncionario.value;
    
    for (let i = 1; i < tabelaDeLancamentos.rows.length; i++) {
        const row = tabelaDeLancamentos.rows[i];
        const valorColuna = row.cells[0].innerText; //0 é a celula que contem o funcionario;
        
        if(funcionarioSelecionado === 'todos' || valorColuna === funcionarioSelecionado){
            row.style.display = '';
        }
        else{
            row.style.display = "none"
        }

    
    }    


    

}
//Filtro Tipo (hora extra, serviço extra...)
const selectTipo = document.querySelector('[data-tipo="dashboard_tipo"');
selectTipo.addEventListener('change', filtroTipo)

function filtroTipo(){
    const tabelaDeLancamentos = document.querySelector('.UltimosCadastros-tabela')
    const tipoSelecionado = selectTipo.value;
    
    for (let i = 1; i < tabelaDeLancamentos.rows.length; i++) {
        const row = tabelaDeLancamentos.rows[i];
        const valorColuna = row.cells[2].innerText; //2 é a celula que contem o tipo;
        
        if(tipoSelecionado === 'todos' || valorColuna === tipoSelecionado){
            row.style.display = '';
        }
        else{
            row.style.display = "none"
        }

    
    }    

}
selectFuncionario.addEventListener('change',totalHoras)

function totalHoras(){
    const funcionarioSelecionado = selectFuncionario.value;
    const tabelaDeLancamentos = document.querySelector('.UltimosCadastros-tabela')
    const painelSoma = document.querySelector('.containerTotais-tipo_valor--horas')
    
    let soma = 0;
    // console.log(soma)
    for (let i = 0; i < tabelaDeLancamentos.rows.length; i++) {
        const row = tabelaDeLancamentos.rows[i]
        const quantidade = row.cells[3].innerText
        const tipo = row.cells[2].innerText
        const nome = row.cells[0].innerText

        console.log(nome==funcionarioSelecionado && tipo=='Hora Extra')

        if(nome==funcionarioSelecionado && tipo=='Hora Extra'){
            // console.log('tese')
            soma += parseFloat(quantidade)
            // console.log(soma)
        }

        if(funcionarioSelecionado=='todos'){
        painelSoma.innerHTML='Selecione um funcionario'
        }
        else{
            painelSoma.innerHTML=soma
        }
        
    }
    
}

selectFuncionario.addEventListener('change',totalServicosExtras)

function totalServicosExtras(){
    const funcionarioSelecionado = selectFuncionario.value;
    const tabelaDeLancamentos = document.querySelector('.UltimosCadastros-tabela')
    const painelSoma = document.querySelector('.containerTotais-tipo_valor--servicos')
    
    let soma = 0;
    // console.log(soma)
    for (let i = 0; i < tabelaDeLancamentos.rows.length; i++) {
        const row = tabelaDeLancamentos.rows[i]
        const quantidade = row.cells[3].innerText
        const tipo = row.cells[2].innerText
        const nome = row.cells[0].innerText


        if(nome==funcionarioSelecionado && tipo=='Servico Extra'){
            // console.log('tese')
            soma += parseFloat(quantidade)
            // console.log(soma)
        }

        if(funcionarioSelecionado=='todos'){
        painelSoma.innerHTML='Selecione um funcionario'
        }
        else{
            painelSoma.innerHTML=soma
        }
        
    }
    
}