import styles from "./Tut.module.css";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

function Tut({ amount, currency, currencies, onAmountChange, onCurrencyChange, duration, metal = false, problem }
) {

    useEffect(() => {
        Aos.refresh();
        Aos.init({ duration: 2000, disable: window.innerHeight < 794 });
    }, []);

    const handleAmount = (e) => {
        // onAmountChange(invalidChars.includes(e.target.value) ? "" : e.target.value);
        console.log(e.target.value === "");
    }

    return (
        <div
            className={styles.currency}
            data-aos='fade-up'
            data-aos-once={false}
            data-aos-duration={`${duration}`}
            data-aos-easing="ease-in-out"
        >
                <select
                    className={styles.currencyChange}
                    value={currency}
                    onChange={(e) => onCurrencyChange(e.target.value)} 
                    >
                    {
                        currencies.map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                            ))
                        }
                </select>
            { problem 
            ? 
                <textarea className={styles.problem} cols="40" rows="5" disabled value="Sorry, I have just a limit of times to use Data ( API ) of Metal Price because I use a Free Plane ):"/>
            :
                <label>
                    <input
                        className={styles.amount}
                        type="number"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => onAmountChange(e.target.value === "" ? amount : e.target.value)}
                    />
                </label>
                    }
            {
                metal && <h5>KG</h5>
            }
        </div>
    )
}

export default Tut