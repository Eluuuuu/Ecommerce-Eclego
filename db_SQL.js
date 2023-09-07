
const mssql = require('mssql')

module.exports = class Sql {
    constructor(stringConnection) {
        this.stringConnection = stringConnection;
    }

    connect() {
        mssql.on('error', err => {
            console.log(err);
            mssql.close();

        });
        console.log(this.stringConnection)

        return mssql.connect(this.stringConnection);
    }

    close() {
        return mssql.close();
    }

    async ejecutar(query) {
        try {

            const pool = await this.connect();
            const result = await pool.request().query(query);
            this.close()
            return result.recordset

        } catch (error) {

            console.log(`Ocurrió un error al solicitar los datos a la base de datos ${error}`);
            this.close()
        }

    };

    

}
    



