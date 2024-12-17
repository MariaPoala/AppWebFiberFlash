import { Routes } from '@angular/router';
import LayoutComponent from './shared/component/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/component/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./principal/dashboard/dashboard.component')
            },
            {
                path:'',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
];
