var storeConfig = {

    checkExpirationInterval: 60000,
    expiration: 60000,
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