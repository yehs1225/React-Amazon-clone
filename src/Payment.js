import './Payment.css';
import React,{useState,useEffect} from 'react'
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import {Link} from 'react-router-dom';
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from './reducer';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Payment() {
    const [{basket,user},dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("");
    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [clientSecret,setClientSecrete] = useState(true);

    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async()=>{
            const response = await axios({
                method:'post',
                // Stripe expects the total in a currencies subunits
                url:`payments/create?total=${getBasketTotal(basket)*100}`
            });
            setClientSecrete(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    console.log('The secrete is >>>',clientSecret)

    const handleSubmit = async(e) =>{
        //do all the fancy stripe stuff
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            //paymentIntent = payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false)

            navigate.reset('/orders');
        })
    }

    const handleChange = e=>{
        //Listen for changes in the CardElemet
        //and display any errors at the customer types their card details
        setDisabled(e.empty);
        setError(e.error?e.error.message:"")
    }
  return (
    <div className='payment'>
      <div className="payment__container">
            <h1>Checkout(<Link to="/checkout">{basket?.length} items</Link>)</h1>
            {/* payment section - delivery address */}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment__address">
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Anglas , CA</p>
                </div>
            </div>
            {/* payment section - review item */}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment__items">
                    {basket.map((item,index) => (
                        <CheckoutProduct
                            key={index}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>
            {/* payment section - payment method */}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment__details">
                    {/* Stripe magic will go */}
                   
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>

                        <div className="payment__priceContainer">
                            <CurrencyFormat 
                                renderText={(value)=>(
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing||disabled||succeeded}>
                                <span>{processing?<p>Processing</p>:'Buy Now '}</span>
                            </button>
                        </div>          
                        {/* Error */}
                            {error && <div>{error}</div>}
                    </form>
                </div>               
            </div>
      </div>
    </div>
  )
}

export default Payment
