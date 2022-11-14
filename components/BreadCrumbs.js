import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';



export default function BreadCrumbs({
    crumbs,
}) {
    const router = useRouter();

    function handleClick(event) {
        event.preventDefault();
        router.push(event.target.href)
    };
    if (!crumbs || typeof crumbs === 'undefined') {
        return null;
    }
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    href={typeof crumbs[0] !== 'undefined' ? crumbs[0].href : '/'}

                >
                    {crumbs[0].label}
                </Link>

                <Link
                    underline="hover"
                    color="inherit"
                    href={crumbs[1].href}
                >
                    {
                        crumbs.length > 0
                        &&
                        typeof crumbs[1] !== 'undefined'
                        &&
                        crumbs[1].label
                        &&
                        typeof crumbs[1].label !== 'undefined'
                        &&

                        crumbs[1]
                            .label[0]
                            .toUpperCase()
                        +
                        crumbs[1]
                            .label
                            .slice(1)
                    }
                </Link>

                {crumbs[2] && typeof crumbs[2] !== 'undefined'
                    &&
                    <Typography
                        color="text.primary"
                    >
                        {crumbs[2].label}
                    </Typography>
                }

            </Breadcrumbs>
        </div>
    );
}