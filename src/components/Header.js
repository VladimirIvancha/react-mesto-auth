import headerLogo from '../images/vector-logo-mesto-russia.svg';

function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип место Россия" className="header__logo"/>
    </header>
  );
}
export default Header;