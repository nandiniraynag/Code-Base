function getFilters(Inputstring) {
    
     // Remove the square brackets and trim any extra spaces
    input = input.replace(/[\[\]]/g, '').trim();

    // Split the string by comma to get each key-value pair
    let pairs = input.split(',');

    // Initialize an empty object to store the result
    let result = {};

    // Iterate over each pair
    pairs.forEach(pair => {
        // Split the pair by '=' to get the key and value
        let [key, value] = pair.split('=');

        // Trim any extra spaces from key and value
        key = key.trim();
        value = value.trim();

        // Add the key-value pair to the result object
        result[key] = value;
    });

    return JSON.stringify(filters);
}
