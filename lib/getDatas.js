import axios from 'axios';
import getModel from './getModels';

export default async function getDatas({
    entityTypeName = 'Projects',
    modelEntityTypeCode,// = 'ORGANIZATIONS',
    returningProp, // ['id','name','account_manager { id name }' ]
    limitProp = 10,
}) {

    let modelFieldKeys = [];

    if (typeof returningProp === 'undefined') {

        let modelParam = typeof modelEntityTypeCode !== 'undefined'
            ? modelEntityTypeCode : entityTypeName.toUpperCase();
        console.log(modelParam, 'M PARAM')
        let modelFieldKeysResponse = await getModel(modelParam);

        console.log(modelFieldKeysResponse, '0.GET DATA SSSS')
        modelFieldKeys = modelFieldKeysResponse
            .filter(f => !/sales_rep_id|parent_id|active|acumatica|anonymized_at|archived_at|created_by|entity_type/i.test(f))

        console.log(modelFieldKeys, '1.GET DATA SSSS')
    };


    let returning =
        typeof returningProp !== 'undefined'
            ? returningProp
            : modelFieldKeys
                .join(' ');

    const query = `query Get${entityTypeName[0].toUpperCase() + entityTypeName.slice(1)
        } {
        slug: ${entityTypeName}
            (${typeof limitProp !== 'undefined' ? 'limit: ' + limitProp + ', ' : ''}order_by: {created_at: desc}) {
                ${returning}
            }
        }`;

    let URL = process.env.GQL_ENDPOINT
        ? process.env.GQL_ENDPOINT
        : process.env.NEXT_PUBLIC_GQL_ENDPOINT
            ? process.env.NEXT_PUBLIC_GQL_ENDPOINT
            : undefined;
    let SECRET = process.env.GQL_ADMIN_SECRET
        ? process.env.GQL_ADMIN_SECRET
        : process.env.NEXT_PUBLIC_GQL_ADMIN_SECRET
            ? process.env.NEXT_PUBLIC_GQL_ADMIN_SECRET
            : undefined;
    console.log(URL, SECRET, 'get DATAss = URURURL');

    let config = {
        url: URL,
        headers: { 'x-hasura-admin-secret': SECRET },
        data: {
            query: query,
        },
        method: 'POST'
    };

    try {
        let response = await axios(config);
        if (response.data.errors) {
            console.log(response.data.errors)
        }
        let results = response.data.data.slug;
        return results;
    } catch (e) {
        console.log(e);
    }
}