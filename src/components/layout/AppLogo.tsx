import Image from 'next/image';
import logo from '../../assets/images/logo.svg';

function AppLogo(): JSX.Element {
  return (
    <div className="logo">
      <Image src={logo} alt="Typing Play" />
    </div>
  );
}

export default AppLogo;
