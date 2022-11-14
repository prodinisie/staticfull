import axios from 'axios';
import getModel from './getModels';

/**
 * - THIS FUNTION IS USED IN GETSTATICPATHS FOR DYNAMIC ROUTES
 *  AND ON GETSTATICPROPS FOR LISTING PAGES
 * 
 * - YOU CAN PASS A RETURNING PROP, WHICH IS A LIST OF FIELD KEYS
 * FOR THE RESPECTIVE ENTITY'S MODEL,
 * ELSE THEY ARE FETCHED WITH GETMODEL();
 * 
 * - HASURA DEVELOPMENT ENVIRONMENT ACCESS LIMITS
 *  AND THE FACT THAT DYAMIC ROUTES ARE BEING BATCH RENDERED
 *  DICTATE *  A LIMIT OF 10 ON QUERIES (dev AND staging only) 
 */

export default async function getDatas({
    entityTypeName = 'Projects',
    modelEntityTypeCode,
    returningProp,
    limitProp = 10,
}) {

    let modelFieldKeys = [];

    if (typeof returningProp === 'undefined') {
        let modelParam = typeof modelEntityTypeCode !== 'undefined'
            ? modelEntityTypeCode : entityTypeName.toUpperCase();
        let modelFieldKeysResponse = await getModel(modelParam);
        modelFieldKeys = modelFieldKeysResponse
            .filter(f => !/sales_rep_id|parent_id|active|acumatica|anonymized_at|archived_at|created_by|entity_type/i.test(f))
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
};


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