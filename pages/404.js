import styles from '../styles/404.module.css';
import Image from 'next/image';
import img404 from '../assets/img/404.png';
import Link from "next/link";

export default function Custom404() {
    return (
        <div className={styles.notFoundPage}>
            <div className={styles.notFoundPageImg}>
               <Image src={img404} alt='pageNotFound'/>
            </div>
            <h3>The page you looking for is no more !!!</h3>
            <p>Try going back to the previous page or see our Help Center for more information.</p>
            <Link href="/">
            <button>Go Home</button>
            </Link>
        </div>
    )
}