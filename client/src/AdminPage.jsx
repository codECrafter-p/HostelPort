import React, { useEffect, useState } from "react";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/users") // direct backend URL
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1  style={{marginLeft:'14px',color:'#e83e5a'}}>Admin Panel </h1>
      <h2  style={{marginLeft:'33px',marginTop:'15px'}}>Registered Users</h2>
      <table border="1" cellPadding="8" style={{ padding: "10px",marginTop:'10px' }}>
        <thead >
          <tr style={{color:'#e83e5a',boxShadow:'1px 1px 10px #e83e5a'}}>
            <th>Name</th>
            <th>Email</th>
            {/* Add more columns if needed */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default AdminPage;


// import React, { useEffect, useState } from "react";

// function AdminPage() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("token"); // ✅ Get JWT token from storage
//         if (!token) throw new Error("No token found. Please log in.");

//         const res = await fetch("http://localhost:5000/api/auth/users", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`, // ✅ Attach token
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch users");

//         const data = await res.json();
//         setUsers(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <h2>Loading...</h2>;
//   if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Admin Panel - Users</h1>
//       <table border="1" cellPadding="8">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             {/* Add more columns if needed */}
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminPage;
