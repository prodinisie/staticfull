import axios from 'axios';
import getModel from './getModels';
require('dotenv').config()


export default async function getDatas({
    entityTypeName,
    modelEntityTypeCode,
    returningProp,
    limitProp,
}) {

    let modelFieldKeys = [];

    if (typeof returningProp === 'undefined') {

        let modelParam =
            typeof modelEntityTypeCode !== 'undefined' ? modelEntityTypeCode : entityTypeName.toUpperCase()
        modelFieldKeys = await getModel(modelParam);
        modelFieldKeys = modelFieldKeys
            .filter(f => !/active|acumatica|anonymized_at|archived_at|created_by|entity_type/i.test(f))


        console.log('model', modelFieldKeys, modelParam);
    }

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

    // id
    // name
    let config = {
        url: process.env.GQL_ENDPOINT,
        headers: { 'x-hasura-admin-secret': process.env.GQL_ADMIN_SECRET },
        data: {
            query: query,
        },
        method: 'POST'
    };
    try {

        let response = await axios(config);
        // console.log('response', response);
        if (response.data.errors) {
            console.log(response.data.errors)
        }
        let results = response.data.data.slug;
        return results;
    } catch (e) {
        console.log(e);
    }
}