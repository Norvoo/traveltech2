// import React, { useState, useEffect } from "react";
// import "./index.css";
// export default function ScrollDialog() {
//   const [data, setData] = useState({ menus: [] });
//   useEffect(async () => {
//     console.log("fetched");
//     let result = await fetch("http://192.168.0.111/traveltech2/api/app/head");
//     result = await result.json();
//     setData(result);
//   }, []);
//   return (
//     <div>
//       <nav className="navbar">
//         {data.menus.map((it) => {
//           if (it.menuItems) {
//             if (it.menuItems instanceof Array && it.menuItems.length > 0) {
//               return (
//                 <div className="d">
//                   <button className="d-btn">{it.name}</button>
//                   <div className="d-content">
//                     <div className="row">
//                       {it.menuItems.map((i) => {
//                         console.log("d", i);
//                         return (
//                           <div className="column" key={i.id}>
//                             <h3>{i.name}</h3>
//                             <a href="">{i.desc}</a>
//                             {i.links.map((o) => {
//                               console.log("links", o);
//                               return (
//                                 <a key={o.id} href={o.url}>
//                                   {o.name}
//                                 </a>
//                               );
//                             })}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               );
//             } else {
//               return (
//                 <a key={it.id} href={it.url}>
//                   {it.name}
//                 </a>
//               );
//             }
//           }
//         })}
//       </nav>
//     </div>
//   );
// }
