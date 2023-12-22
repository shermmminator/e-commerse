import "./OrderItem.css"
import { Box, Typography } from "@mui/material";

function OrderItem({ orderItem }) {

    const { name, qty, price } = orderItem;

    return ( 
        <Box 
        className="orderitem-container"
        > 
            <div className="orderitem-name-holder">
                <Typography variant="h6" id="order-detail-text">
                    {name}
                </Typography>
            </div>
            <div className="orderitem-qty-holder">
                <Typography variant="h6" id="order-detail-text">
                    {qty}
                </Typography>
            </div>
            <div className="orderitem-price-holder">
                <Typography variant="h6" id="order-detail-text">
                    {price+" $"}
                </Typography>
            </div>
        </Box>  
     );
};
 
export default OrderItem