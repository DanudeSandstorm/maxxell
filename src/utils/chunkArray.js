/**
 * @template A
 * @param {Array<A>} array
 * @param {number} chunkSize
 * @returns {Array<Array<A>>}
*/
function chunkArray(array, chunkSize) {
    return Array.from(
        { length: Math.ceil(array.length / chunkSize) },
        (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize)   
    );
}

module.exports = chunkArray;
