class Imgur {
    static URL = "https://api.imgur.com/3/";
    static CLIENT_ID = "c848e36012571f2";

    static async gifs(page) {
        const res = await fetch(`${Imgur.URL}gallery/hot/rising/${page}`, {
                headers: {
                    Authorization: `Client-ID ${Imgur.CLIENT_ID}`
                },
                mode: "cors"
            }),
            json = await res.json();

        if (json.success) {
            return json.data.filter(({ type }) =>
                ["image/gif", "video/mp4"].includes(type)
            );
        } else {
            throw new Error(json.data.error);
        }
    }
}

export default Imgur;
