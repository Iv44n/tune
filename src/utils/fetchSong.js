export const fetchSong = async ({ lib, id }) => {
    try {
        const res = await fetch(`/api/songApi?lib=${lib}&id=${id}`);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};
