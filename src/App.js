import logo from './logo.svg';
import SignUp from './SignUp';
import DisplayData from './DisplayData';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" exact element={<SignUp/>} />  
				<Route path="/display-data" element={<DisplayData/>} />  
			</Routes>
		</div>
	);
}

export default App;
