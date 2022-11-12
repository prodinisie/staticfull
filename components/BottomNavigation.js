import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import Link from 'next/link';



export default function LabelBottomNavigation({
    navItemsProp,
}) {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    let navItems = [
        { label: 'customers', value: 'customers', icon: <RestoreIcon /> },
        { label: 'projects', value: 'projects', icon: <FavoriteIcon /> },
        { label: 'profile', value: 'profile', icon: <LocationOnIcon /> },
    ]
    return (
        <Paper
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}
        >
            <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
                {
                    navItems.map(nvitm => (
                        <Link key={'nav_link' + nvitm.value} href={nvitm.value}>
                            <a href={nvitm.value}>

                                <BottomNavigationAction
                                    key={nvitm.label + 'nvaitm'}
                                    label={nvitm.label}//"Recents"
                                    value={nvitm.value}//"recents"
                                    icon={nvitm.icon}//<RestoreIcon />}
                                />
                            </a>
                        </Link>
                    ))
                }
            </BottomNavigation>
        </Paper>
    );
}