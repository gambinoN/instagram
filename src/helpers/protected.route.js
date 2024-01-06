import React from 'react';
import { Navigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function ProtectedRoute({ user, children}) {
    return user ? React.cloneElement(children, { user }) : <Navigate to={ROUTES.LOGIN} replace /> 
}