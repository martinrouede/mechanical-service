const xlsx = require("xlsx");
const path = require('path');
const fs = require('fs');
const axios = require('axios')

const { PATH_XLS_FILES } = require('../../config');

fs.readdir(PATH_XLS_FILES, async (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(async (file) => {
        const aResult = {};
        aResult.services = [];

        const spreadsheet = xlsx.readFile(`${PATH_XLS_FILES}${file}`);

        let data = xlsx.utils.sheet_to_json(spreadsheet.Sheets[spreadsheet.SheetNames[0]]);
        data = data.slice(0, data.length - 1);

        data.forEach(async (res) => {
            try {
                let date = '';

                if (res.FECHA) {
                    let dateSplit = res.FECHA.split('.');

                    dateSplit[0] = dateSplit[0].length === 1 ? 0 + dateSplit[0] : dateSplit[0];
                    dateSplit[1] = dateSplit[1].length === 1 ? 0 + dateSplit[1] : dateSplit[1];

                    dateSplit = dateSplit.reverse();

                    date = dateSplit.join('-');
                }

                const service = {};
                service.date = date;
                service.clientName = res.CLIENTE.toUpperCase();
                service.carModel = res['MARCA DE AUTO'] ? res['MARCA DE AUTO'].toUpperCase() : '';
                service.carPatent = res.PATENTE ? res.PATENTE.toUpperCase() : '';
                service.carKilometers = res.KILOMETRAJE ? res.KILOMETRAJE : 0;
                service.amount = res.MONTO ? res.MONTO : 0;
                service.repair = res['REPARACIÓN'] ? res['REPARACIÓN'].toUpperCase() : '';

                await axios.post(`http://localhost:3000/services/`, service);
            } catch (error) {
                console.log(error);
            }
        })
    });
})
