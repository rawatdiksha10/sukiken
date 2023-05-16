import './App.css'; // commented
import 'bootstrap/dist/css/bootstrap.min.css'; // included
// import NewUserForm from './form/newuserform';
import NewRegistrationForm from './form/newregistrationform';
// import Registration from './form/registration';
// import TestFile from './form/testfile';
import MyPageForm from './form/myPageForm';
import EngineerInfo from './form/engineerInfo';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        Registration form
      </header> */}
      {/* <NewUserForm/> */}
      <NewRegistrationForm/>
      {/* <MyPageForm/> */}
      <EngineerInfo/>
      {/* <Registration/> */}
      {/* <TestFile/> */}

    </div>
  );
}

export default App;