import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Component } from 'react';
import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

export default class LoaderComponent extends Component {
  render() {
    return (
      <Loader
        className={s.loader}
        type="Oval"
        color="#001eff"
        height={80}
        width={80}
      />
    );
  }
}
