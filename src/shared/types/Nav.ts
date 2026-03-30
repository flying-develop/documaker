import { ReactNode } from 'react';
import { Roles } from '../config/roles/roles';

export interface NavItem {
    path: string;
    label: string;
    icon: ReactNode;
    roles: Roles[];
    disabled?: boolean;
}
