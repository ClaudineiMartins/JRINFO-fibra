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
const inputsFormularioFuncionarios = document.querySelectorAll('[data-tipo]')
inputsFormularioFuncionarios.forEach(input => {
    const tipoDeInput = input.dataset.tipo;
   input.addEventListener('blur', () => {
    verificaInputValido(input)

    })
})
const tiposDeErro = [
    'badInput',
    'customError',
    'patternMismatch',
    'rangeOverflow',
    'rangeUnderflow',
    'stepMismatch',
    'tooShort',
    'typeMismatch',
    'valueMissing',
    'tooLong',
]
const mensagensDeErro = {
    nome: {
        valueMissing:'O campo de nome Não pode estar vazio.',
        tooShort: 'ta curto bro'
    },
    cargo: {
        valueMissing:'O campo de nome Não pode estar vazio.',
        tooShort: 'ta curto bro'
    },
    admissao: {
        valueMissing:'O campo de nome Não pode estar vazio.',
        tooShort: 'ta curto bro'
    },
    nome: {
        valueMissing:'O campo de nome Não pode estar vazio.',
        tooShort: 'ta curto bro'
    }
    

}
function mostraMensagemErro(input){
    let tipoDeInput = input.dataset.tipo;
    let mensagem = ""
    console.log(tipoDeInput)
    tiposDeErro.forEach(erro =>{
        if(input.validity[erro]){
        mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })

    
    
    
    
    return mensagem
    

}


function verificaInputValido(input){
    if(input.validity.valid){
        input.parentElement.classList.remove('container-form--invalido')
        input.parentElement.querySelector('.mensagem-erro').innerHTML=""
    }
    else{
        input.parentElement.classList.add('container-form--invalido')
        input.parentElement.querySelector('.mensagem-erro').innerHTML=mostraMensagemErro(input)

    }

  
   

    tiposDeErro.forEach(erro=>{
        if(input.validity[erro]){
            console.log(input.validity[erro])
            mostraMensagemErro(input,erro)
            
            console.log('ta erro')
            // console.log(input.validity[erro])
        }
        
        
    })
}


function cadastraFormularioNaTabela(){}

