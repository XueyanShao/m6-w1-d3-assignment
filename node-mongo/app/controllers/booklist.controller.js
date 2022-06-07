const mongoose = require('mongoose');
// mongoose.set('useFindAndModify',false);
const Booklist = mongoose.model('Booklist');

exports.createBooklist = (req,res) => {
    const booklist = new Booklist({
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        status: req.body.status,
    })
    //Save a inventory in the MongoDB
    booklist.save().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            message: "Fail!",
            error: err.message
        });
    });
};

exports.getBooklist = (req,res) => {
    Booklist.findById(req.params.id).select('-_v')
        .then(booklist => {
            res.status(200).json(booklist);
        }).catch(err => {
            if(err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.id,
                    error: err
                });
            }
            return res.status(500).send({
                message: "Error retrieving Book with id " + req.params.id,
                error: err
            });
        });
};

exports.booklists = (req,res) => {
    Booklist.find().select('-_v').then(booklistInfos => {
        res.status(200).json(booklistInfos);
    }).catch(err => {
        console.log(error);

        res.status(500).json({
            message: "Error",
            error: error
        });
    });
};

exports.deleteBooklist = (req,res) => {
    Inventory.findByIdAndRemove(req.params.id).select('-_v-_id')
        .then(booklist => {
            if(!booklist) {
                res.status(404).json({
                    message: "No book found with id= " + req.params.id,
                    error: "404",
                });
            }
            res.status(200).json({});
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can't delete book with id = " + req.params.id,
                error: err.message,
            });
        });
};

exports.updateBooklist = (req,res) => {
    //Find inventory and update it
    Booklist.findByIdAndUpdate(
        req.body._id,
            {
                id: req.body.id,
                title: req.body.title,
                author: req.body.author,
                status: req.body.status,
            },
             {new: false}
    ).select('-_v')
       .then(booklist => {
           if(!booklist) {
               return res.status(404).send({
                   message: "Error -> Can't update a book with id = " + req.params.id,
                   error: "Not Found"
               });
           }
           res.status(200).json(booklist);
       }).catch(err => {
           return res.status(500).send({
               message: "Error -> Can't update a book with id = " + req.params.id,
               error: err.message
           });
       });
};