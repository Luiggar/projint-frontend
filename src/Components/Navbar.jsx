import { useNavigate, useLocation } from "react-router-dom";
import useColorMode from "../Hook/useColorMode";







  const Navbar = () =>{
  const [colorMode,setColorMode] = useColorMode();
  const navigate =useNavigate()
  const location = useLocation();
  const isActiveRoute = (route) => {
    const regex = new RegExp(`^${route}`);
    return regex.test(location.pathname);
  };

      return (
        <><div className=" bg-gray-800 ">
          <div className='h-16 flex items-center'>
            <p className='text-white font-bold ml-5'>Management Tools System</p>
            <button onClick={() => navigate("/cliente")} className={`${isActiveRoute("/cliente") ? "bg-slate-500" : "bg-gray-800"} hover:bg-slate-500 object-right ml-12 h-16 w-32 text-white`}>Clientes</button>
            <button onClick={() => navigate("/funcionario")} className={`${isActiveRoute("/funcionario") ? "bg-slate-500" : "bg-gray-800"} hover:bg-slate-500 object-right ml-12 h-16 w-32 text-white`}>Funcionarios</button>
            <button onClick={() => navigate("/fornecedor")} className={`${isActiveRoute("/fornecedor") ? "bg-slate-500" : "bg-gray-800"} hover:bg-slate-500 object-right ml-12 h-16 w-32 text-white`}>Fornecedores</button>
            <button onClick={() => navigate("/produtos")} className={`${isActiveRoute("/produtos") ? "bg-slate-500" : "bg-gray-800"} hover:bg-slate-500 object-right ml-12 h-16 w-32 text-white`}>Produtos</button>
            <button onClick={() => setColorMode(colorMode === "light" ? 'dark' : 'light')} class=" w-10 "><div className=" text-white bg-gray-700 dark:bg-gray-800 dark:text-gray-800">☼</div><div className=" text-gray-800 dark:bg-gray-700 dark:text-white">☽</div></button>
          </div>
          
        </div><p className=' h-16'></p></>
      )

  }

export default Navbar;

