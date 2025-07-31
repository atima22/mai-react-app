import Profile from "./components/Profile";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
export default function MyProfile(){
    return (
   <>
    <Profile/>
    <h2 className="text-xl text-center  text-purple-900 font-bold m-5 "> Contact </h2>
    <div className="flex items-center m-5 w-1/2 mx-auto">
        <div className="grid grid-cols-3 gap-3 mx-auto">
        <Contact 
        label="Atima Kaewprapai" 
        link="https://www.facebook.com/atima.kaewprapai.9/" 
        icon="./images/face.png"/>
        <Contact 
        label="Atima Kaewprapai" 
        link="https://www.instagram.com/_atima.ma_/" 
        icon="./images/ig.png"/>
        <Contact 
        label="atima22" 
        link="https://www.tiktok.com/@atima22" 
        icon="./images/tiktok.png"/>
        </div>
    </div>
     <div  className="ps-5 pe-5 pt-1 pb-1 bg-purple-300 rounded w-16 flex justify-center my-5">
        <a href="/">Back</a>
    </div>
    <Footer
    title = "  © 2025 Atima. 026730491009-9"/>
   </>
);

}