function redirectToUpload(category) {
    // Redirect to the appropriate page based on the category
    let page = "";
    if (category === "excursions") {
        page = "excursions.html";
    } else if (category === "calella") {
        page = "calella.html";
    } else if (category === "tonteries") {
        page = "tonteries.html";
    }

    // Construct the full URL
    const baseUrl = "http://127.0.0.1:5500/";
    const url = `${baseUrl}${page}`;

    // Redirect to the constructed URL
    window.location.href = url;
}
