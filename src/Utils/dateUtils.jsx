
// Function to format date as DD-MM-YYYY HH:mm AM/PM
export function formatDateTime(originalDateStr) {
    const date = new Date(originalDateStr);

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    return date.toLocaleString('en-GB', options).replace(',', '');
}

// Function to format date as DD-MM-YYYY
export function formatDate(originalDateStr) {
    const date = new Date(originalDateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

// Function to format time as HH:mm AM/PM
export function formatTime(originalDateStr) {
    const date = new Date(originalDateStr);
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    return date.toLocaleTimeString('en-GB', options);
}
