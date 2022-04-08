import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import * as styles from './donation.module.scss'

const Donation = () => {
  return (
    <>
      <hr />    
      <div className={styles.donation}>
        <div className="donate-title">
          <p>Welcome buy me a coffee / 珍珠奶茶</p>
        </div>
        {/* LINE Pay */}
        <div className="donate-line">
          <StaticImage className={styles.linePayQRcode} width={298} height={298} layout="fixed" src="../images/line-pay/qrcode.jpg" alt="line pay QRcode" />
          <a href="https://line.me/R/ch/1586237320/?forwardPath=/c2c/transfer&no=20090061084" className={styles.linePayBtn} aria-label="linePay-donate">
            <picture>
              <source
                sizes="(max-width: 608px) 100vw, 608px"
                srcSet="../images/line-pay/logo-1920w.webp 1920w, ../images/line-pay/logo-1280w.webp 1280w, ../images/line-pay/logo-640w.webp 640w, ../images/line-pay/logo-320w.webp 320w"
                type="image/webp" />
              <StaticImage width={238} height={69} src="../images/line-pay/logo.png" alt="line pay logo" />
            </picture>
          </a>
        </div>
        {/* Paypal */}
        <div className={styles.donatePaypal}>
          <a href="https://www.paypal.me/hoyangtsai" target="_blank" rel="noreferrer">
            <StaticImage width={115} height={44} layout="fixed" src="https://checkout.paypal.com/pwpp/1.6.1/images/pay-with-paypal.png" alt="paypal donation" />
          </a>
        </div>
        {/* China */}
        <div className={styles.donateChina}>
          <p>微信/支付寶/QQ 掃一掃</p>
          <StaticImage width={230} height={230} layout="fixed" src="https://api.qrserver.com/v1/create-qr-code/?size=230x230&margin=8&data=https%3A%2F%2Fhoyangtsai.github.io%2Fdonate" alt="China donation" />
        </div>
      </div>
    </>
  )
}


export default Donation;