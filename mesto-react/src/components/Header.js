import headerLogo from '../images/vector-logo-mesto-russia.svg';

function Header() {
  return (
    <header class="header">
      <img src={headerLogo} alt="Логотип место Россия" class="header__logo"/>
    </header>
  );
}
  
export default Header;