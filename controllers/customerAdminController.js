const {Customer} = require('../models')

const customerPage = async (req, res) =>{
    try{
        const customers = await Customer.findAll()

        res.render("customers/index.ejs", {
            customers,
            message: req.flash('message', "")
        })

    }catch (err) {
        res.render("error.ejs",{
            message: err.message,
        })

    }
}

const createCustomerPage = async (req, res) =>{
    try{
        res.render("customers/create.ejs")

    }catch (err) {
        res.render("error.ejs",{
            message: err.message,
        })

    }
}

const createCustomer = async (req, res) => {
    try {
        await Customer.create(req.body);
        req.flash('message', "ditambah")
        res.redirect("/customers")
    } catch (err) {
        console.log(err.message)
    }

}

const editCustomerPage = async (req, res) =>{
    try{
        const customer = await Customer.findByArray(req.params.id)

        res.render("customers/edit.ejs", {
            customer,
            message: req.flash('message', "")
        })

    }catch (err) {
        res.render("error.ejs",{
            message: err.message,
        })

    }
}
const editCustomer = async (req, res) =>{
    try{
        const customer = await Customer.Update(
            req.params.id, req.body, {
                new: true
            })
            req.flash('message', "edit")

        res.redirect("customers")
    }catch (err) {
        res.render("error.ejs",{
            message: err.message,
        })

    }
}
const deleteCustomer = async (req, res) =>{
    try{
        await Customer.remove({
            where: {
                id: req.params.id, 
            }
        })

        res.redirect("customers")
    }catch (err) {
        res.render("error.ejs",{
            message: err.message,
        })

    }
}


module.exports={
    customerPage,
    createCustomerPage,
    createCustomer,
    editCustomerPage,
    editCustomer,
    deleteCustomer,
}