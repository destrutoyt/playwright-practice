class APIUtils {
    
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext; // Store the API context for use in methods'
        this.loginPayload = loginPayload; // Store the login payload for use in methods
    }

    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
            { 
                data: this.loginPayload 
            }
        );
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token; // Extract the token from the response
        return token; // Return the token for use in other tests
    }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken(); // Get the token before creating an order
        // Create an order using the token
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', 
            {
                data: orderPayload,
                headers: {
                    'Authorization': response.token, // Use the token in the header for the order creation. This will create an order under the associated user
                    'Content-Type': 'application/json'
                }
            }
        );
        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0]; // Extract the order ID from the response
        response.orderId = orderId; // Store the order ID in the response object
        return response; // Return the response object for use in other tests
    }
}

module.exports = {APIUtils};