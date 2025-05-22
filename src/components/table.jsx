import { PrimaryTable } from "./primaryTable";
import { SecondaryTable } from "./secondaryTable";
function Table({switchState,activatedList}){
    return(<>{(switchState)?<PrimaryTable activatedList={activatedList}/>:<SecondaryTable activatedList={activatedList}/>}</>);
}

export {Table}