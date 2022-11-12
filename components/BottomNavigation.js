import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import HailRoundedIcon from '@mui/icons-material/HailRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useRouter } from 'next/router';


export default function LabelBottomNavigation({
    navItemsProp,
}) {
    let navItems = [
        { label: 'products', value: 'products', icon: <HailRoundedIcon /> },
        { label: 'customers', value: 'customers', icon: <HailRoundedIcon /> },
        { label: 'projects', value: 'projects', icon: <AssignmentTurnedInRoundedIcon /> },
        { label: 'profile', value: 'profile', icon: <AccountCircleRoundedIcon /> },
    ];
    const router = useRouter();
    console.log('ROUTER PATHNAME', router.pathname)
    let calcNav = navItems
        .filter(
            ({ value: v }) => (
                new RegExp(v, 'i').test(router.pathname)
            )
            [0]
        );

    let calcNavValue = calcNav && typeof calcNav !== 'undefined'
        ? calcNav.value : undefined

    const [value, setValue] = React.useState(calcNavValue);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0
            }}
            elevation={3}
        >
            <BottomNavigation
                sx={{ width: '100%' }}
                value={value}
                onChange={handleChange}>
                {
                    navItems.map(nvitm => (

                        <BottomNavigationAction
                            href={'/' + nvitm.value}
                            key={nvitm.label + 'nvaitm'}
                            label={nvitm.label}
                            value={nvitm.value}
                            icon={nvitm.icon}
                        />
                    ))
                }
            </BottomNavigation>
        </Paper>
    );
}