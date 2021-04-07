const Produto = require('../models/produto');
const status = require('http-status');
 

exports.Insert = (req, res, next) => {
    const Nome = req.body.Nome;
    const Descricao = req.body.Descricao;
    const Preco = req.body.Preco;
    const QuantidadeEstoque = req.body.QuantidadeEstoque;
 
    
    Produto.create({
        Nome: Nome,
        Descricao: Descricao,
        Preco: Preco,
        QuantidadeEstoque: QuantidadeEstoque,
    })
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
exports.SelectAll = (req, res, next) => {
    Produto.findAll()
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            }
        })
        .catch(error => next(error));
}
 
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;
 
    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
exports.Update = (req, res, next) => {
    const id = req.params.id;
    const Nome = req.body.Nome;
    const Descricao = req.body.Descricao;
    const Preco = req.body.Preco;
    const QuantidadeEstoque = req.body.QuantidadeEstoque;
 
    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                produto.update({
                    Nome: Nome,
                    Descricao: Descricao,
                    Preco: Preco,
                    QuantidadeEstoque: QuantidadeEstoque,
                    },
                    {
                        where: { id: id }
                    })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Delete = (req, res, next) => {
    const id = req.params.id;
 
    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                produto.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
