const express = require('express');

const app = express();

const users = [
    { id: 1, name: 'Alice', status: 'Disponível' },
    { id: 2, name: 'Bob', status: 'Ocupado' },
    { id: 3, name: 'Charlie', status: 'Ausente' }
];

// GET REQUEST
// GET localhost:3000/api/users
app.get('/api/users', (req, res) => {
    // QUERY PARAMS
    console.log(req.query);

    // /localhost:3000/api/users?status=Disponível
    const status = req.query.status;
    if (status) {
        return res.status(200).json(users.filter(user => user.status === status));
    }

    return res.status(200).json(users);
});

// GET localhost:3000/api/users/1
app.get('/api/users/:id', (req, res) => {
    // ROUTE PARAMS
    console.log(req.params);
    
    const id = parseInt(req.params.id);
    console.log(id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'O "id" do usuário deve ser um número.' });
    }

    const user = users.find(user => user.id === id);
    console.log(user);
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    
    return res.status(200).json(user);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000...");
});