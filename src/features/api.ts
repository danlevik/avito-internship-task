export async function fetchQuery(address) {
    try {
        const response = await fetch(
            `https://api.kinopoisk.dev/${address}`,
            {
                headers: {
                    "X-API-KEY": process.env.REACT_APP_TOKEN
                }
            },
        )

        if (response?.ok) {
            return { data: await response.json(), error: false };
        }

        return { data: undefined, error: true }

    } catch (e) {
        console.log("Error fetching data: " + e);
        return { data: undefined, error: true }
    }
}