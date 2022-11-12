import React from 'react'
import getData from "../lib/getData"
import getDatas from "../lib/getDatas"
import BasicCard from '@components/BasicCard';

let entityTypeName = 'projects';
let singleQueryEntityTypeName = 'projects';
let model = [
    'account_manager { id first_name last_name }',
    'active',
    'archived_at',
    'assignee_id',
    'completed_at',
    'created_at',
    'created_by',
    'description',
    'due_date',
    'entity_id',
    'entity_type { name id code }',
    'id',
    'metadata',
    'name',
    'owner_id',
    'owner { id first_name last_name }',
    'project_manager_id',
    'project_manager { id first_name last_name }',
    'project_number',
    'source_id',
    'source_ref',
    'status_id',
    'tenant_id',
    'updated_at',
    'updated_by',
];

export async function getStaticPaths() {
    let ids = await getDatas({
        entityTypeName: entityTypeName,
    });
    ids = ids.slice(0, 10);
    let paths = ids.map(m => ({ params: { id: m.id.toString() } }))
    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
};

export async function getStaticProps(context) {
    let data = await getData({
        entityTypeName: singleQueryEntityTypeName,
        id: context.params.id,
        returningProp: model.join(' ')
    });
    return {
        props: { data: data },
    }
};

export default function Page({ data }) {
    return (
        <div style={styles.container}>
            <div style={styles.subContainer} >
                <BasicCard
                    maxWidth={600}
                    collapseContent={collapseContent(data)}
                    values={values(data)}
                />
            </div>
            <br /><br /><br /><br /><br /><br />
        </div>
    )
};


const styles = {
    container: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: '0px',
        left: '0px',
        backgroundColor: 'azure',
        overflowY: 'scroll',
    },
    subContainer: {
        width: '600px',
        margin: 'auto',
        marginTop: '2rem',
    }
};



const collapseContent = data => Object.keys(data)
    .map(prp => (
        <div key={'rp' + prp}>{
            data[prp] && data[prp].id
                ? <>
                    {
                        Object.keys(data[prp]).map(k => (
                            <div key={'rap' + k}>
                                {k} : {data[prp][k] ? data[prp][k] : '-'}
                                <br />
                            </div>
                        ))
                    }
                </>
                : <>{prp} : {data[prp]}</>
        }
            <br />
        </div>
    ));




const values = data => {

    let subs = Object.keys(data)
        .filter(f => data[f] && data[f].id)
        .map(f => data[f].name
            ? data[f].name
            : data[f].first_name
                ? data[f].first_name + ' ' + data[f].last_name
                : '-'
        );
    return [
        data.id,
        data.name ? data.name : '-',
        subs[0],
        subs[1],
        'END',
        data.name ? data.name : '-',
        data.name ? data.name : '-',
    ]
}