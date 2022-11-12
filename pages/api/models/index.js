import getCustomers from "lib/getCustomers";

export default async function handler(req, res) {

    try {
        let response = await getCustomers();
        console.log(response, 'testRESPOSNE')
        res.status(200).json(response.map(m => m.id))
    } catch (e) {
        console.log(e);
    }
}

