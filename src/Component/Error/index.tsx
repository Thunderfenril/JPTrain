import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function Error() {
    const error = useRouteError()
    if (isRouteErrorResponse(error)) {
        return (
            <div id='error'>
                <h1>Error!</h1>
                <p>An unexpected error has occurred.</p>
                <p>
                    <em style={{ color: 'red' }}>
                        {`${error.statusText}`}
                        {error.data?.message || error?.data || ''}
                    </em>
                </p>
            </div>
        )
    }
    return null
}
