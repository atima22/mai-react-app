export default function Profile(){
  return (
    <>
    <h1 className="text-2xl  text-white text-center bg-purple-900 font-bold"> Profile</h1>
    <div className="p-10 bg-purple-100 rounded">
      <img src="/images/me.jpg" className="rounded-full w-32 shadow-lg border-4 border-neutral-100 mx-auto" />
      <h2 className="text-xl text-center  text-purple-900 font-bold m-5 "> About Me</h2>
      <p className=" text-center w1/2 mx-auto">
         ชื่อ นางสาวอติมา แก้วประไพ ชื่อเล่น ไหม <br />
         อายุ 20 ปี รหัสนักศึกษา:026730491009-9<br />
         สาขา เทคโนโลยีสารสนเทศ คณะบริหารธุรกิจและเทคโนโลยีสารสนเทศ<br />
     </p>
    </div>
   
   </>
  );

}