import './App.css';
import { useHistory } from "react-router-dom";
 function Logout() {
     const history = useHistory();
     const handleLogout = () => {
         sessionStorage.removeItem('token');
         history.push('/Login')
     }
     return(
        <button onClick={handleLogout}>Logout</button>
    )
 }
 export default Logout;