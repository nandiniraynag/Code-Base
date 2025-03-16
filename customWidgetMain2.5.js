// Code 
function getFilters(inputString) {
    console.log('getFilters method called');
    try {
        // Example logic to retrieve filters
        const strng = inputString;
        const filterString = 'filters = [City = Pune, Month = March ]';
        const filters = extractFilters(filterString);
        console.log('Filters retrieved:', filters);
        if (!filters) {
            throw new Error('No filters found');
        }
        return JSON.stringify(filters);
    } catch (error) {
        console.error('Error in getFilters:', error);
        throw error; // Re-throw the error to be handled by the calling function
    }
}

function extractFilters(filterString) {
    console.log('extractFilters called with:', filterString);
    // Remove the prefix 'filters = [' and the suffix ']'
    const filterContent = filterString.replace('filters = [', '').replace(']', '').trim();
    console.log('Filter content:', filterContent);
    
    // Split the filter content by ', ' to get individual filters
    const filterArray = filterContent.split(', ');
    console.log('Filter array:', filterArray);

    // Create an object to hold the key-value pairs
    const filters = {};

    // Iterate over the filter array and split each filter into key and value
    filterArray.forEach(filter => {
        const [key, value] = filter.split(' = ').map(item => item.trim());
        filters[key] = value;
    });

    console.log('Extracted filters:', filters);
    return JSON.stringify(filters;
}

// Example usage
try {
    const filters = getFilters();
    console.log('Filters:', filters);
} catch (error) {
    console.error('Failed to get filters:', error);
}
