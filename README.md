SudaCart - A Grocery Online Shop 

Use Stack ====>>
            front-end : react, tailwind
            backend : express, node.js, mongoose
            database: mongodb 
            storage : cloudinary
            deploy : vercel
            payment-gatway = Stripe
            authentication : jwt(token)

live- link ====>>  https://suda-cart.vercel.app/


user flow ====>>
                   * Register / login => explore main page => see best sellers => have different  categories => add to cart => buy product => add address => make payment(cash on delivery / online (Stripe) => done
                   * seller flow ====> login/ register first => in user icon  "as seller" => click => fill form (seller only login) => then add, change stock, see orders detail in it=>done



user feature  ====>>
                *  Register & Login (JWT based authentication)
                *  Browse products by categories
                *  View Best Sellers
                *  Add / Remove products from cart
                *  Manage delivery address
                *  Checkout with:
                *  Cash on Delivery (COD)
                *  Online Payment (Stripe)
                *  View order history & order status


 Seller Features ====>>
               *  Seller registration & login
               * Switch role via “As Seller” option
               * Add new products
               * Update product details
               * Manage stock availability (in-stock / out-of-stock)
               * View customer orders & order details
