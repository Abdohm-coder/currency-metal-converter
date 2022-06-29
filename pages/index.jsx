import Head from 'next/head';
import Image from "next/image";
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Tut from '../components/Tut';
import Loading from '../components/Loading';
import { useTheme } from 'next-themes'

export async function getServerSideProps() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.API_KEY
    }
  };

  let data2 = [], data = [];
  
  const res2 =  await fetch("https://data-asg.goldprice.org/dbXRates/USD");
  const request2 = await res2.json();
  data2 = {"XAU - Gold":1/ request2.items[0]["xauPrice"] * 0.0283495231 , "XAG - Silver" : 1 / request2.items[0]["xagPrice"] * 0.0283495231};
  
  const res = await fetch("https://exchangerate-api.p.rapidapi.com/rapid/latest/USD", options)
  const request = await res.json();
  data = request.rates;
  
  return {
    props: {
      rates2: data2 ,
      rates: data,
    }
  }
}

export default function Home({ rates2, rates }) {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [amount3, setAmount3] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("DZD");
  const [currency3, setCurrency3] = useState("XAU - Gold");

  let problem = false;

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    if(!!rates) {
      handeAmount3(1);
    }

  }, [rates, rates2]);

  const handeAmount1 = (amount1) => {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount3(format(amount1 * rates2[currency3] / rates[currency1]));
    setAmount1(amount1);
  };

  const handleCurrency1 = (currency1) => {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount3(format(amount1 * rates2[currency3] / rates[currency1]));
    setCurrency1(currency1);
  };
  const handeAmount2= (amount2) => {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount3(format(amount2 * rates2[currency3] / rates[currency2]));
    setAmount2(amount2);
  };

  const handleCurrency2 = (currency2) => {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount3(format(amount2 * rates2[currency3] / rates[currency2]));
    setCurrency2(currency2);
  };
  const handeAmount3= (amount3) => {
    setAmount1(format(amount3 * rates[currency1] / rates2[currency3]));
    setAmount2(format(amount3 * rates[currency2] / rates2[currency3]));
    setAmount3(amount3);
  };

  const handleCurrency3 = (currency3) => {
    setAmount1(format(amount3 * rates[currency1] / rates2[currency3]));
    setAmount2(format(amount3 * rates[currency2] / rates2[currency3]));
    setCurrency3(currency3);
  };

  function format(number) {
    return number.toFixed(4);
  }

    useEffect(() => setMounted(true), []);

    if (!mounted) return null

  return (
    <div className={styles.app} data-theme={theme}>
      <Head>
        <title>Currency And Metal Converter</title>
        </Head>
      <div className={styles.switchTheme}>
        <label className={styles.label}>
          <input type="checkbox" onClick={switchTheme} className={styles.checkbox}  />
          <i className="fas fa-moon"></i>
          <i className="fas fa-sun"></i>
          <div className={`${styles.ball} ${theme === "light" ? styles.checked : ""}`}></div>
        </label>
      </div>
      <div className={styles.app__container}>
        <h1>Currency And Metal Converter</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. minus eum ab et dolorem!</p>
        { rates2.length !== 0 ? 
          <main className={styles.converter}>
            <Tut
              onAmountChange={handeAmount1}
              onCurrencyChange={handleCurrency1}
              amount={amount1}
              currency={currency1}
              currencies={Object.keys(rates)} 
              duration={1000}
            />
            <Tut
              onAmountChange={handeAmount2}
              onCurrencyChange={handleCurrency2}
              amount={amount2}
              currency={currency2}
              currencies={Object.keys(rates)} 
              duration={1500}
            />
            <Tut
              onAmountChange={handeAmount3}
              onCurrencyChange={handleCurrency3}
              amount={amount3}
              currency={currency3}
              currencies={Object.keys(rates2)} 
              duration={2000}
              problem={problem}
              metal
            />
          </main>
      : <Loading type="spin" color="#6697f7" />   
      }

        <footer className={styles.footer}>
            <h2>Developed by <strong>ABDO HADJ MED</strong></h2>
            <p>copyright © All rights researved {new Date().getFullYear()}</p>
            <div className={styles.footer__social}>
              <a href="https://www.facebook.com" target="_blank">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/512px-2021_Facebook_icon.svg.png?20210818083032" width={30} height={30} alt="Facebook logo " />
              </a>
              <a href="https://www.facebook.com" target="_blank">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Linkedin_icon.svg/256px-Linkedin_icon.svg.png?20110609134306" width={30} height={30} alt="Linkedin logo " />
              </a>
            </div>
        </footer>
      </div>
    </div>
  )
}