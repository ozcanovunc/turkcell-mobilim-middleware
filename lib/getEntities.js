module.exports = (obj, entityName) => {
    let collectionName = `${entityName}Collection`;
    let thereAreMultipleResults = !!obj[collectionName][entityName][0];
    return thereAreMultipleResults ?
        Object.values(obj[collectionName][entityName]) : [obj[collectionName][entityName]];
};
