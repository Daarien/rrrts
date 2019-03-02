export async function getFetch(url: string) {
    const data = await fetch(url).then(response => response.json()).catch(error => console.error(`getFetch(${url}) -> catch error ->`, error));
    if (data) {
        if (data.error) {
            console.error('getFetch response', data.error);
            return null;
        } else {
            return data;
        }
    }
    else {
        return null;
    }
}

export async function postFetch(url: string, sendObj: Record<string, any>, optionalParams = {}) {
	const data = await fetch(url, {
        method: 'post',
        body: JSON.stringify(sendObj),
        ...optionalParams
    })
    .then(response => response.json())
    .catch(error => console.error(`postFetch(${url}) -> catch error ->`, error));
    if (data) {
        if (data.error) {
            console.error(`postFetch(${url}) -> `, data.error);
            return null;             
        }
        else {
            return data;
        }
    } else {
        console.error(`postFetch(${url}) -> response =`, data);
        return null;
    }
	
}