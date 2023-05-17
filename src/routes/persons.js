const express = require('express'); // inyectamos express
const router = express.Router(); // creamos un router de express

const Person = require('../models/persons'); // inyectamos el modelo de persons

router.get('/gente', async (req, res) => { // creamos una ruta para obtener todas las personas
    const Persons = await Person.find(); // obtenemos todas las personas de la base de datos y las guardamos en una constante llamada Persons (await es para hacer async/await)
    res.render('index', { Persons }); // renderizamos la vista index.ejs
});

router.get('/addPerson', (req, res) => { // creamos una ruta para agregar personas
    res.render('addPerson'); // renderizamos la vista add.ejs
});

router.post('/addPerson', async (req, res) => { // creamos una ruta para agregar personas
    const person = Person({
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    }); // con la constante person guardamos los datos que nos llegan del formulario, se toma el modelo Person

    await person.save() // guardamos la persona en la base de datos (await es para hacer async/await)
        .then(() => { // si se guardo correctamente
            res.redirect('/gente'); // redireccionamos a la ruta /gente
        })
        .catch((err) => { // si hubo un error
            console.log(err); // mostramos el error en consola
        })
});

router.get('/findById/:id', async (req, res) => { // creamos una ruta para buscar personas por id
    Person.findById(req.params.id) // buscamos la persona por id
        .then((person) => { // si se encontro la persona
            res.render('editPerson', { person }); // renderizamos la vista editPerson.ejs y le pasamos la persona encontrada
        })
        .catch((err) => { // si hubo un error
            console.log(err); // mostramos el error en consola
        });
});

router.post('/updatePerson', (req, res) => { // creamos una ruta para actualizar personas
    Person.findByIdAndUpdate(req.body.objId, { // buscamos la persona por id y la actualizamos
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    }) // con la constante person guardamos los datos que nos llegan del formulario, se toma el modelo Person
        .then(() => { // si se actualizo correctamente
            res.redirect('/gente'); // redireccionamos a la ruta /gente
            console.log("Se actualizó a " + req.body.objId); // mostramos un mensaje en consola con el id de la persona actualizada
        })
        .catch((err) => { // si hubo un error
            console.log(err); // mostramos el error en consola
        });
});

router.get('/deletePerson/:id', async (req, res) => { // creamos una ruta para buscar personas por id
    Person.findByIdAndDelete(req.params.id) // buscamos la persona por id
        .then(() => { // si se elimino correctamente
            res.redirect('/gente'); // redireccionamos a la ruta /gente
        })
        .catch((err) => { // si hubo un error
            console.log(err); // mostramos el error en consola
        });
});

router.post('/find', async (req, res) => { // creamos una ruta para buscar personas por nombre
    Person.find({ nombre: { $regex: req.body.criteria, $options: "i" } }) // buscamos la persona por nombre (con regex para que sea insensible a mayusculas y minusculas y options para que busque en toda la cadena)
        .then((Persons) => { // si se encontró la persona
            res.render('index', { Persons }); // renderizamos la vista index.ejs y le pasamos la persona encontrada
        })
        .catch((err) => { // si hubo un error
            console.log(err); // mostramos el error en consola
        });
});

module.exports = router; // exportamos el router para poder usarlo en otros archivos