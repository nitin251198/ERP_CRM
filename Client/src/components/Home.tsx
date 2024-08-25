// HomePage.tsx
import React from 'react';
import Navbar from '../components/NavBar';
import Dashboard from './Dashboard'; // Assuming you have a TaskList component
import illustration from '../assets/undraw_access_account_re_8spm.svg';

const HomePage: React.FC = () => {
  return (
    <div className='w-full'>
      <Navbar />
      {
        localStorage.getItem("authToken")?

      
      <div className="w-full">
        {/* Other content */}
        <Dashboard />
      </div>:
     <div className="flex flex-col items-center justify-center min-h-screen text-center">
     <img src={illustration} alt="Illustration" className="mb-6 w-1/2 max-w-md" />
     <div>
       <h1 className="m-6 text-3xl">Please Login to get your Data!</h1>
     </div>
   </div>
   
}
    </div>
    
  );
};

export default HomePage;
