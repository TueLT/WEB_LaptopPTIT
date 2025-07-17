async function checkAccessTokenIsvalid() {
    try {
        let accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            return;
        }

        let response = await fetch('http://localhost:8080/check-accessToken', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const textResponse = await response.text();

        if (textResponse !== "Token is still valid") {
            // If token is not valid, try to refresh it
            let refreshToken = localStorage.getItem('refreshToken');

            const refreshResponse = await fetch('http://localhost:8080/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`
                }
            });

            if (!refreshResponse.ok) {
                console.error('Failed to refresh token');
                return;
            }

            const refreshData = await refreshResponse.json();
            // Store the new tokens
            localStorage.setItem('accessToken', refreshData.accessToken);
            localStorage.setItem('refreshToken', refreshData.refreshToken);

            console.log('Tokens refreshed successfully');
            location.reload();
        } else {
            console.log('Token is still valid');
        }
    } catch (error) {
        console.error('Error during token validation or refresh:', error);
    }
};

export default checkAccessTokenIsvalid;