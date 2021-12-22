import s from './MoviesPage.module.css';

export default function MoviesPage() {
  return (
    <>
      <form>
        <input type="search" className={s.searchinput}></input>
        <button type="submit">Search</button>
      </form>
    </>
  );
}
