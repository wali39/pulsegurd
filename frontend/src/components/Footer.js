import "./Footer.css"
import devIcon from "../assets/dev.png"
import copyIcon from "../assets/copy.png"
export default function Footer() {
    return (
        <div className="footer shadow-lg">
            <span><span><img className="ficon" src={copyIcon} alt="copyright" /></span>  2023  <strong>Group 5(ECE 19) </strong></span> &nbsp;
            <span> <span><img className="ficon" src={devIcon} alt="developer" /></span> <strong>Wali Ullah</strong></span>
        </div>
    )
}