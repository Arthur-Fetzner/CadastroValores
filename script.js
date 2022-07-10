function opcoesAcao(acao, id) {
    let elemento = document.getElementById(`opcoesAcao${id}`);
    if (acao == 'on') {
        elemento.classList.add('d-inline');
    }else if (acao == 'out') {
        elemento.classList.remove('d-inline');
    }
}

function atualizarTabela() {
    let tabela = document.getElementById('tabela');
    let indice = JSON.parse(localStorage.getItem('indice'));
    let saldo = 0;

    tabela.innerHTML = '';

    for (let i = 1; i <= indice; i++) {
        let novo = JSON.parse(localStorage.getItem(`${i}`));
        if (novo != null) {           
            let zero = novo.valor > 0 ? 'dark' : 'danger';
            tabela.innerHTML += `
            <tr onmouseover="opcoesAcao('on', ${i})" onmouseleave="opcoesAcao('out', ${i})">
                <td class="col-2 text-${zero}">${novo.data}</td>
                <td class="col-6 text-${zero}">${novo.descricao}</td>
                <td class="col-4">
                <span class="text-${zero}">R$ ${novo.valor}</span>
                <button type="submit" class="btn btn-sm btn-danger float-right py-0 d-none" onclick="apagar(${i})" id="opcoesAcao${i}">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                </td>
            </tr>`;

            saldo += parseFloat(novo.valor);
            saldo = saldo >= 0 ? Math.floor(saldo*100)/100 : Math.ceil(saldo*100)/100;
        } 
    }
    document.getElementById('Saldo_cor').classList = saldo >= 0 ? 'text-success' : 'text-danger';
    document.getElementById('Saldo').innerHTML = `R$${saldo}`;
}

function apagar(id) {
    localStorage.removeItem(`${id}`);
    atualizarTabela();
}

function salvar(){
    let data = document.getElementById('data').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;
    
    if (data == '' || descricao == '' || valor == '') {
        alert('Preencha todos os campos');
    }else{
        localStorage.indice = JSON.parse(localStorage.getItem('indice')) + 1;
        
        let novo = {
            data: data,
            descricao: descricao,
            valor: valor
        };

        localStorage.setItem(`${localStorage.indice}`, JSON.stringify(novo));

        atualizarTabela();

        document.getElementById('data').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('valor').value = '';
    }
}

if ((Storage) != undefined) {
    let indice = localStorage.getItem('indice');

    if (indice != null) {
        atualizarTabela();
    }else{
        localStorage.setItem('indice', 0);
    }
}