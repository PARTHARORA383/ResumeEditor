import { ResumeUpload } from "../components/ResumeUpload";
import ResumeEditor from "../components/ResumeEditor";


export function Home (){

return <div>
  <div className=" relative grid grid-cols-3 gap-32 mt-20 ml-8 mr-8 ">
  <div className="col-span-1">
  </div>
  <div className="fixed">

  <ResumeUpload/>
  </div>
  <div className="col-span-2">
    <ResumeEditor/>
  </div>

  </div>
  
</div>
}