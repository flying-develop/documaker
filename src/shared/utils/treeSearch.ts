export const treeSearch = (subKey: string, idKey?: string) => {
    /**
     * Find the first item in a nested tree with a specific key/value pair.
     * @param {Object[]} items - Tree to search.
     * @param {String} [key] - Key to inspect.
     * @param {String} value - Value to match against.
     * @returns {Object} Found object, or `undefined` if nothing was found.
     */
    function finder(items: any[], key: string, value: any): any {
        const id = idKey || key;
        const val = idKey ? key : value;
        let foundValue;

        // Search surface level of items
        for (let item of items) {
            if (item[id] === val) {
                foundValue = item;
                break;
            }
        }

        // If no match was found, then try searching within nested items
        if (typeof foundValue === 'undefined') {
            for (let item of items) {
                if (item[subKey] && item[subKey].length > 0) {
                    foundValue = finder(item[subKey], id, val);
                }
            }
        }

        return foundValue;
    }

    return finder;
}