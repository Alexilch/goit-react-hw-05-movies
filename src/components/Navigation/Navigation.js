import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  // return (
  <nav>
    <NavLink
      exact="true"
      to="/"
      className={styles.link}
      style={({ isActive }) => ({
        color: isActive ? 'red' : '',
      })}
    >
      HomePage
    </NavLink>
    <NavLink
      to="/movies"
      className={styles.link}
      style={({ isActive }) => ({
        color: isActive ? 'red' : '',
      })}
    >
      Movies
    </NavLink>
  </nav>
);
// )

export default Navigation;
