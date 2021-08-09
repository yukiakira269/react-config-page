import { NavLink } from 'react-router-dom';
import styles from './nav.module.css';

function Navigation() {
    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-dark bg-light ${styles.nav}`}>
                <div className="containerFluid">
                    <ul className={`navbar-nav ${styles.navpills}`}>
                        <li className='nav-item'>
                            <NavLink className={`nav-link ${styles.hover}`}
                            exact activeClassName={styles.active} to="/Conf">Configuration</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className={`nav-link ${styles.hover}`}
                            exact activeClassName={styles.active} to="/TODO">TODO</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );

}

export default Navigation;