const axios = require('axios');
const Email = require('../models/Email');

module.exports = {
    async store(req, res){
        let { email } = req.query;
        email = decodeURIComponent(email);
        const emailExists = await Email.findOne({ 'email': email });
        if (!emailExists) {
            Email.create({
                email,
                active: true
            })
            return res.json({email: email})
        } 
        return res.json({error: emailExists, email: "Email ja cadastrado"})
    }
};