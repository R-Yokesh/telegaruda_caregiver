import React from 'react';
import { CTooltip } from '@coreui/react';

const url = '/telegaruda';
export const Sidebar_Menus = [
  {
    name: 'Patient',
    to: '/patient',
    iconClass: 'fa fa-user', // FontAwesome icon class
    iconType: 'solid' // Optional, defaults to 'regular'
  },
  {
    name: 'Appointment',
    to: '/appointment',
    iconClass: 'fa fa-calendar-alt', // FontAwesome icon class
    iconType: 'solid' // Optional, defaults to 'regular'
  },
  {
    name: 'Doctor',
    to: '/doctor',
    iconClass: 'fa fa-stethoscope', // FontAwesome icon class
    iconType: 'solid' // Optional, defaults to 'regular'
  }
];

