import { useNavigate } from "react-router-dom";
import useColorMode from "../Hook/useColorMode";







const Navbar = () =>{
 const [colorMode,setColorMode] = useColorMode();
 const navigate =useNavigate()

    return (
      <><div className=" bg-gray-800 ">
        <div className='h-16 flex items-center'>
          <p className='text-white font-bold ml-5'>Management Tools System</p>
          <button onClick={() => navigate("/cliente")} className="bg-gray-800 hover:bg-slate-500 object-right ml-12 h-16 w-32 text-white">Cliente</button>
          <button onClick={() => navigate("/")} className="bg-gray-800 hover:bg-slate-500 object-right ml-2 h-16 w-32 text-white">Funcionario</button>
          <button onClick={() => setColorMode(colorMode === "light" ? 'dark' : 'light')} class=" w-10 "><div className=" text-white bg-gray-700 dark:bg-gray-800 dark:text-gray-800">☼</div><div className=" text-gray-800 dark:bg-gray-700 dark:text-white">☽</div></button>
        </div>
        
      </div><p className=' h-16'></p></>
    )

}

export default Navbar;

