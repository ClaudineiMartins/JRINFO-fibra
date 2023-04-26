const botaoAdicionarFuncionario = document.querySelector('.colaboradores_cabecalho__adicionar')
const formularioAdicionarFuncionario = document.querySelector('.cadastroFuncionario')
const botaoFecharFormularioFuncionario = document.querySelector('.fa-circle-xmark')
const fundoFormularioFuncionario = document.querySelector('.backdropFilter-invivel_JS--funcionario')

botaoAdicionarFuncionario.addEventListener('click', toggleFormularioFuncionario)
botaoFecharFormularioFuncionario.addEventListener('click', toggleFormularioFuncionario )
fundoFormularioFuncionario.addEventListener('click', toggleFormularioFuncionario)
function toggleFormularioFuncionario (){
    formularioAdicionarFuncionario.classList.toggle('ocultaCadastro_JS--funcionario')
    fundoFormularioFuncionario.classList.toggle('backdropFilter-invivel_JS--funcionario')
    

}


function cadastraFormularioNaTabela(){}