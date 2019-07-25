/** Activation of FindOrCreate atomic method for mongoose 5.x schema plugin
 *
 * @author: Diego Garcia
 * @license: MIT
 **/

/**
 * @param Object query: What are you looking for in mongo. ({_id: YOUR_ID}
 * @param Object document: The document to find or create
 * @param {Optional} Function callback
 *
 * @return: a Promise with 2 values. The 'document' itself and a boolean 'created' then indicates if the record was found or finally created.
 */

module.exports = function(query, document) {

    return new Promise((resolve, reject) => {
        if (arguments.length < 2) {
            reject("findOrCreate requires 2 arguments: 'query' and 'document'");
        }
        else {
            document = {"$setOnInsert": document};

            // Define the default settings for activate findOrCrate using findAndUpdate method of mongoose
            let options = {
                new: true,
                useFindAndModify: false,
                setDefaultsOnInsert: true,
                rawResult: true,
                upsert: true
            };

            this.findOneAndUpdate(query, document, options, (err, record) => {
                if (err || !record || typeof record == 'undefined') {
                    reject(err);
                }
                else {
                    resolve({
                        document: record.value,
                        created: !record.lastErrorObject.updatedExisting
                    });
                }
            });
        }
    })
};
