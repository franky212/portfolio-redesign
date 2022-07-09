import logo from '../assets/logos/fd..svg';

const MainContent = () => {

  return (
    <>
    <main className="container">
      <nav className="flex items-center w-full">
        <img
          alt="Frank Delaguila - Front End Web Developer and Designer Logo (FD.)"
          className="w-16"
          src={logo}
        />
      </nav>
    </main>
    </>
  );
};

export default MainContent;