import { myTermProj} from "./data/termProject";
import { Link, useParams } from "@remix-run/react";

export default function ProjView() {
    const { tpid } = useParams();

    const tpTmp = myTermProj.filter((item) => {
       return item.tpId === Number(tpid)
   }).map((tpObj,index) =>
    <>
    <p>รหัสโปรเจค : {tpObj.tpId}</p>
    <p>รายวิชา: {tpObj.tpSubj}</p>
    <p>รายละเอียด : {tpObj.tpDesc}</p>
    <Link to={`/termproj/projlist`}>Back</Link>
    </>
 ); 
     
   if(tpTmp.length === 0){
    return "***ไม่พบข้อมูลโปรเจค***"
   }

    return(
        <>
         คุณเลือกข้อมูลโปรเจครายวิชา : {tpid}
          {tpTmp}
        </>
    );
}
