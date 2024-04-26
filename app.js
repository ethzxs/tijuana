const express = require('express');
const fileupload = require('express-fileupload');
const { engine } = require('express-handlebars');
const mysql = require('mysql2');
const path = require('path')

// APP
const app = express();

// HABILITANDO O UPLOAD DE ARQUIVOS
app.use(fileupload());

// ADICIONAR BOOTSTRAP
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))

// Define o diretório estático para servir arquivos CSS
app.use('/css', express.static(path.join(__dirname, 'css')));

// Define o diretório estático para servir arquivos JavaScript
app.use('/JS', express.static(path.join(__dirname, 'JS')));

app.use('/imagens', express.static(path.join(__dirname, 'imagens')));


// MANIPULAÇÃO DE DADOS VIA ROTAS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// EXPRESS-HANDLEBARS CONFIG
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// SQL CONNECTION CONFIG
const conexao = mysql.createConnection({
    host: '54.94.67.8',
    user: 'root',
    password: '2!7?0y8U#+%nMx@',
    database: 'tijuana'
});

//Rota de acesso ao admin
app.get('/admin', (req, res) => {
    let sql = `SELECT * FROM convidados`;
    conexao.query(sql, (erro, retorno) => {
        res.render('admin', { convidados: retorno, layout: false })
    })
})

// Rota principal
app.get('/entrar', (req, res) => {
    res.render('entrar', { layout: false })
});

// Rota de cadastro
app.post('/cadastrar', (req, res) => {
    // Obter os dados do formulário
    let nome = req.body.nome;
    let telefone = req.body.telefone;
    
    // SQL para inserir os dados no banco de dados
    let sql = `INSERT INTO convidados (nome, telefone) VALUES (?, ?)`;
    
    // Executar o comando SQL com os dados fornecidos
    conexao.query(sql, [nome, telefone], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao inserir dados no banco de dados:', erro);
            res.status(500).send('Erro ao inserir dados no banco de dados');
            return;
        }
        
        // Responder ao cliente com sucesso
        console.log('Dados inseridos com sucesso!');
        res.redirect('/entrar')
    });
});

// Rota de limpar os dados
app.post('/limpar', (req, res) => {
    // SQL para excluir todos os dados da tabela
    let sql = `DELETE FROM convidados`;
    
    // Executar o comando SQL para excluir todos os dados da tabela
    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            console.error('Erro ao excluir dados do banco de dados:', erro);
            res.status(500).send('Erro ao excluir dados do banco de dados');
            return;
        }
        
        // Responder ao cliente com sucesso
        console.log('Todos os dados excluídos com sucesso!');
        res.redirect('/admin');
    });
});

// Testar a conexão com o banco de dados
conexao.connect(erro => {
    if (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro);
        return;
    }
    console.log('Conexão bem-sucedida com o banco de dados!');
});

// Iniciar o servidor na porta 3000
app.listen(3306, () => {
    console.log('Servidor iniciado na porta 3306');
});