const express = require('express');
const app = express();
const PORT = 9000;

const { logger} = require('./middleware/log.middleware');

app.use(express.json());
app.use(logger);

app.listen(PORT, "localhost" , () => {
    console.log(`server berjalan di port ${PORT}`);
});

app.get("/hello", (request,response) => {
    return response.send('halo dari expressjs');
});

let Biodatas= [
    { id: 1, nama:"Bagas Aditya Ramadhan"},
    { id: 2, umur:"17"},
    { id: 3, alamat:"PERUM BTR BLOK O"},
    { id: 4, instagram:"@schimitzz_"},
    { id: 5, nomor_telepon:"085782114208"},
    
];

app.get("/ Biodatas", (request, response) => {
    response.status(200).json(Biodatas);
});

app.get('/Biodatas/:id',function(request, response) {
    const Biodata = Biodatas.find(data => data.id === parseInt(request.params.id))

    if(Biodata) {
        response.status(200).json(Biodata);
    } else {
        reponse.status(400).json({
            pesan: "Data biodata tidak ditemukan",
        });
    }
})

app.post('/Biodatas', (request, response) => {
    const newBiodata = {
        id: Biodatas.length + 1,
        ...request.body
    };

    Biodatas.push(newBiodata);

    response.status(200).json(newBiodata);
});

// app.put('/users/:id', (request,response) => {
//     const user = users.find(
//     data => data.id === parseInt(request.params.id)
//     );

//     if(user){
//         user.name = request.body.name;
//         user.age = request.body.age;

//         reponse.json(user);
//     } else {
//         response.status(400).json({
//             pesan: "User tidak ditemukan"
//         });
//     }

// })