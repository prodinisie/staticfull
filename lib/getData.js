import axios from 'axios';
require('dotenv').config()
import getModel from './getModels';


export default async function getData({
    entityTypeName,
    id,
    returningProp,
}) {
    let modelFieldKeys = [];
    if (typeof returningProp === 'undefined') {
        modelFieldKeys = await getModel(entityTypeName.toUpperCase());

        console.log('model', modelFieldKeys);
    };

    let returning = typeof returningProp !== 'undefined'
        ? returningProp
        : modelFieldKeys
            .join('\n');

    console.log('RETURNING:', returning)

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

    let config = {
        url: process.env.GQL_ENDPOINT,
        headers: { 'x-hasura-admin-secret': process.env.GQL_ADMIN_SECRET },
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
    console.log(response.data, 'RES ERESRSPAOSNER')
    let results = response.data.data.slug;
    return results;
}

//       customer_id: entity_id
//       customer: organization {
//         id
//         name
//       }
//       name
//       project_number
//       description
//       due_date
//       brand_manager: account_manager {
//         id
//         first_name
//         last_name
//         email
//       }
//       brand_associate: project_manager {
//         id
//         first_name
//         last_name
//         email
//       }
//       contact: owner {
//         id
//         first_name
//         last_name
//         email
//       }
//       pipeline_stage {
//         entity_pipeline_stage_id
//         pipeline_id
//         pipeline_name
//         pipeline_stage_id
//         stage_name
//         effective_date
//       }
//       attributes(where: {attribute_code: {_in: $attributes}}) {
//         attribute_id
//         attribute_name
//         attribute_code
//         attribute_value
//         field_type_id
//         field_type
//         field_type_code
//         properties
//         entity_attribute_id
//       }
//       tags {
//         id
//         name
//         code
//       }
//       presentations: orders(where: {entity_type: {code: {_eq: "presentation"}}}) {
//         id
//         name
//         entity_type {
//           id
//           name
//           code
//         }
//         order_items {
//           id
//           name
//           quantity
//           price
//         }
//       }
//       active
//       created_at
//       created_by: created_by_user {
//         id
//         first_name
//         last_name
//         email
//       }
//       updated_at
//       updated_by: updated_by_user {
//         id
//         first_name
//         last_name
//         email
//       }
//     }
//   }`