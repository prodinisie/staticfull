import axios from 'axios';
import getModel from './getModels';

export default async function getData({
    entityTypeName,
    id,
    returningProp,
}) {
    let modelFieldKeys = [];
    if (typeof returningProp === 'undefined') {
        modelFieldKeys = await getModel(entityTypeName.toUpperCase());
        // console.log('no retProp,MODEL:', modelFieldKeys)
    };

    let returning = typeof returningProp !== 'undefined'
        ? returningProp
        : modelFieldKeys
            .join('\n');

    let query = `
        query Get${entityTypeName}(
            $id: bigint!,
            $attributes: [String!]
        ) {
            slug: ${entityTypeName.toLowerCase()}_by_pk(id: $id) {
                ${returning}
            }
        }`;

    let variables = { id: id };

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
    // console.log(URL, SECRET, 'get DATA = URURURL');

    let config = {
        url: URL,
        headers: { 'x-hasura-admin-SECRET': SECRET },
        data: {
            query: query,
            variables: variables,
        },
        method: 'POST',
    };

    let response = await axios(config);
    if (response.data.errors) {
        console.log(response.data.errors);
    }
    let results = response.data.data.slug;
    return results;
};
