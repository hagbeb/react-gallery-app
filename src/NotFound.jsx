// component that will display on the * route ie when the URL matches no other route
const NotFound = () => {
    const styles = {
        fontSize: '24px',
        paddingTop: '5px'
    };
    return (
        <div className="container">
            <h1>Page Not Found</h1>
            <div style={styles}>
                <p>Sorry, it looks like the page you were looking for is not available.</p>
                <p>Please try again.</p>
            </div>
        </div>
    );
}

export default NotFound;