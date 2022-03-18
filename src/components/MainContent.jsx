import logo from '../assets/logos/fd..svg';

const MainContent = () => {

  return (
    <main className="container">
      <nav className="flex items-center w-full">
            <img alt="Frank Delaguila - Designer and Developer Logo (FD.)" className="w-16" src={logo} />
            <ul className="flex items-center justify-between ml-24 w-64">
              <li>Home</li>
              <li>About</li>
              <li>Portfolio</li>
              <li>Contact</li>
            </ul>
          </nav>
    </main>
  );
};

export default MainContent;