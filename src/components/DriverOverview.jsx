import { useState, useEffect } from "react";
import { useAuth } from "./authentication/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function DriverOverview() {
  const [driverCollection, setDriverCollection] = useState([]);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/registerLogin");
    } else {
      fetchDrivers();
    }
  }, [isLoggedIn]);

  async function fetchDrivers() {
    const response = await fetch(
      "https://api.openf1.org/v1/drivers?session_key=9158"
    );

    if (response.status === 200) {
      const data = await response.json();
      setDriverCollection(data);
    } else if (response.status === 404) {
      setDriverCollection(null);
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end">
        <button
          onClick={logout}
          className="px-4 py-2 m-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md"
        >
          <Link to="/registerLogin">Logout</Link>
        </button>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">Number</th>
            <th className="px-4 py-2">Team</th>
          </tr>
        </thead>
        <tbody>
          {driverCollection.map((driver, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border px-4 py-2">
                <img
                  src={driver.headshot_url}
                  alt={driver.full_name}
                  className="h-10 w-10 rounded-full"
                />
              </td>
              <td className="border px-4 py-2">{driver.full_name}</td>
              <td className="border px-4 py-2">{driver.country_code}</td>
              <td className="border px-4 py-2">{driver.driver_number}</td>
              <td className="border px-4 py-2">{driver.team_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DriverOverview;
