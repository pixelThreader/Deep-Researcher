import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Settings = () => {
    return (
        <div>
            <dl>
                <dt>Settings Page: </dt>
                <dd><Link to="/settings/models/manage">Manage Models</Link></dd>
            </dl>
            {/* Nested routes render here, e.g. /settings/models/... */}
            <Outlet />
        </div>
    )
}

export default Settings