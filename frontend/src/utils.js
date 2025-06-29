export function formatDate(date) {
    return date.toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}