import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { TabView, TabPanel } from "primereact/tabview";
import { Badge } from "primereact/badge";
import api from '../services/Interceptor'
import "./style.css";


const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartCount, setCartCount] = useState(0);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
        //   const response = await axios.get(
        //     "https://zartek-task.vercel.app/api/resto-cafe"
        //   );
        const response = await api.get("/resto-cafe");
          console.log(response.data.data)
          setData(response.data.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  
    
    return (
      
      <div className="p-6">
       
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold flex-1">{data[0].restaurant_name}</h1>
          <div className="relative flex items-center gap-2">
            <p className="font-semibold">My Orders</p>
            <i className="pi pi-shopping-cart text-3xl mt-2 ml-2"></i>
            {cartCount > 0 && (
              <Badge
                value={cartCount}
                className=" right-3 bg-red-500 text-white text-xs"
              />
            )}
          </div>
  
  
  
        </div>
  
        <div className="overflow-y-auto">
          <TabView scrollable>
            {data[0].table_menu_list.map((category, index) => (
              <TabPanel key={index} header={category.menu_category}>
                <Menu
                  items={category.category_dishes}
                  setCartCount={setCartCount}
                />
              </TabPanel>
            ))}
          </TabView>
        </div>
      </div>
    );
  };

export default Dashboard
