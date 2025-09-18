import { myTermProj} from "./data/termProject";
import { Link } from "@remix-run/react";

 export default function Projlist(){
  return (
    <>
    <h1 className="text-2xl  text-white text-center bg-purple-900 font-bold">ข้อมูลโปรเจครายวิชา</h1>
    <p>
      {
        myTermProj.map((tpObj,index) => 
        <li key={index}>
          โปรเจควิชา {tpObj.tpSubj} --
          <Link to={`/termproj/proj/${tpObj.tpId}`}>View</Link>
        </li>
        )
      }
    </p>
   
   </>
  );

}