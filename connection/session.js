var storeConfig = {

    checkExpirationInterval: 600000,
    expiration: 600000,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};

module.exports = storeConfig;