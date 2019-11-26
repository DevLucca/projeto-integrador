const axios = require('axios');
const qs = require('querystring');
const Point = require('../models/Point');
const config = require('../config.json');

module.exports = {
    async store(req, res) {
        const { cep, flagTipo } = req.query;
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`).catch(function (error) {
            if (error.response) {
              return res.json({ "status_code": error.response.status, "error": error.response.data, "field": "CEP"});
            }
        })
        if (!response["data"]["erro"]){
            const { logradouro, complemento, bairro, localidade, uf } = response["data"]
            const logr = [logradouro, complemento, bairro, cep, localidade, uf]
            let reqAddress = logr.join(', ')
            const reqlatlong = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?` + qs.stringify({address:reqAddress, CA:null, key:config.API.token})).catch(function (error) {
                if (error.response) {
                    return res.json({ "status_code": error.response.status, "error": error.response.data, "field": "LATLONG"});
                }
                return 1;
            })
            result = reqlatlong.data.results[0]
            const { lat, lng: long } = result.geometry.location
            const { formatted_address } = result
            const flag = flagTipo.split(",")
            await flag.forEach((element,i) => {
                flag[i] = Number(element)
            });
            const cepExists = await Point.findOne({ 'CEP': cep })
            if (!cepExists){
            await Point.create({
                endereco: formatted_address,
                CEP: cep,
                lat,
                long,
                tipo: flag,
                active: true
            })
            return res.json({logradouro: formatted_address, lat: lat, long: long})
        } else { res.json({ "error": "Ponto ja existe!" })}
        } else {
            return res.json({erro: "CEP invalido"})
        }
    },
    async show(req, res) {
        if(!!req.body.option){
            return res.send( await Point.find({ 'active': (true ? req.body.option == 'active' : false) }));
        } else {
            return res.send( await Point.find({ 'active': true }));
        }
    },

    async delete(req, res) {
        await Point.deleteOne({ _id: req.params._id})
        return res.json({ status: "Deletado com sucesso" })
    }
} 